import torch
import os
import torch.nn.functional as F
from torch_geometric.nn import GatedGraphConv
from torch_geometric.data import Data
import numpy as np
import torch.nn as nn

# 定义字母表
alphabet = 'abcdefghijklmnopqrstuvwxyz'
char_to_index = {char: idx for idx, char in enumerate(alphabet)}

# 将节点标签中的每个字符转换为索引
def char_to_index_encode(label, max_length):
    indices = np.zeros(max_length, dtype=int)
    for i, char in enumerate(label):
        if char in char_to_index:
            indices[i] = char_to_index[char]
    return indices

# 设置文件路径
output_dir = 'dataSet/Intermediate_data'
ggnn_model_path = os.path.join(output_dir, 'ggnn_model.pt')
lstm_encoder_path = os.path.join(output_dir, 'lstm_encoder.pt')

edge_index_1 = torch.tensor([[0, 1],
                             [2, 2]], dtype=torch.long)
node_features_str_1 = ["LightOn", "DoorOpen", "OnTV",]

# 确定最大节点标签长度
max_length = max(len(label) for label in node_features_str_1)

# 将节点标签编码为索引
node_features_encoded = [char_to_index_encode(label.lower(), max_length) for label in node_features_str_1]
x_encoded = torch.tensor(node_features_encoded, dtype=torch.float)

# 构建图数据对象
data_1 = Data(x=x_encoded, edge_index=edge_index_1)

# 定义GGNN模型
class GGNN(nn.Module):
    def __init__(self, in_channels, out_channels, num_layers):
        super(GGNN, self).__init__()
        self.conv = GatedGraphConv(out_channels, num_layers)
        self.linear = nn.Linear(out_channels, out_channels)
        self.attention = nn.Linear(out_channels, 1)
        
    def forward(self, x, edge_index):
        x = self.conv(x, edge_index)
        x = F.relu(x)
        x = self.linear(x)
        
        # 注意力机制
        attn_weights = F.softmax(self.attention(x), dim=0)
        x = (attn_weights * x).sum(dim=0, keepdim=True)
        return x

# 定义字符级别的 LSTM 编码器
class CharLSTMEncoder(nn.Module):
    def __init__(self, input_size, hidden_size, num_layers=1):
        super(CharLSTMEncoder, self).__init__()
        self.embedding = nn.Embedding(input_size, hidden_size)
        self.lstm = nn.LSTM(hidden_size, hidden_size, num_layers=num_layers, batch_first=True)
        self.attention = nn.Linear(hidden_size, 1)

    def forward(self, x):
        embedded = self.embedding(x)
        output, _ = self.lstm(embedded)
        
        # 注意力机制
        attn_weights = F.softmax(self.attention(output), dim=1)
        x = (attn_weights * output).sum(dim=1)
        return x

# 检查是否有GPU可用
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
print(f"Using device: {device}")

# 初始化模型
in_channels = data_1.num_node_features  # 节点特征维度
out_channels = 20  # 输出的维度，可以根据需要调整
num_layers = 3  # GGNN层数
ggnn_model = GGNN(in_channels, out_channels, num_layers).to(device)
ggnn_model.load_state_dict(torch.load(ggnn_model_path))
ggnn_model.eval()

input_size = len(char_to_index) + 1  # 字符字典大小 + 1 (填充符号)
hidden_size = 20
num_layers = 2
lstm_encoder = CharLSTMEncoder(input_size, hidden_size, num_layers).to(device)
lstm_encoder.load_state_dict(torch.load(lstm_encoder_path))
lstm_encoder.eval()

# 运行模型
data_1 = data_1.to(device)
with torch.no_grad():
    ggnn_output = ggnn_model(data_1.x, data_1.edge_index)

# 假设有一句话
sentence1 = "if the light is on and the door is open then turn on the TV"
sentence1 = sentence1.lower()

# 将句子1转换为字符级别的表示
char_to_idx = {char: idx + 1 for idx, char in enumerate("abcdefghijklmnopqrstuvwxyz")}
char_to_idx['<pad>'] = 0  # 用于填充序列

max_word_length = max(len(word) for word in sentence1.split())
char_indices = [[char_to_idx.get(char, 0) for char in word] for word in sentence1.split()]
padded_char_indices = [indices + [0] * (max_word_length - len(indices)) for indices in char_indices]

# 调整为 batch_first 格式，即 (batch_size, sequence_length, input_size)
char_tensor = torch.tensor(padded_char_indices).unsqueeze(0).to(device)  # 添加 batch 和 sequence 维度

with torch.no_grad():
    lstm_output = lstm_encoder(char_tensor)

# 定义计算余弦相似度的函数
def cosine_similarity(vec1, vec2):
    vec1 = vec1 / vec1.norm(dim=1, keepdim=True)
    vec2 = vec2 / vec2.norm(dim=1, keepdim=True)
    similarity = torch.sum(vec1 * vec2)
    return similarity.item()

# 计算余弦相似度
similarity = cosine_similarity(ggnn_output, lstm_output)

print("余弦相似度：", similarity)
