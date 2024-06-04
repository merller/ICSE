import torch
import torch.nn as nn
import numpy as np
import torch_geometric
from torch_geometric.data import Data
from torch_geometric.nn import GatedGraphConv

# 定义字符级嵌入和双向LSTM编码器
class BiCharLSTMEncoder(nn.Module):
    def __init__(self, vocab_size, embed_dim, hidden_dim, num_layers):
        super(BiCharLSTMEncoder, self).__init__()
        self.embedding = nn.Embedding(vocab_size, embed_dim)
        self.lstm = nn.LSTM(embed_dim, hidden_dim, num_layers, batch_first=True, bidirectional=True)
    
    def forward(self, x):
        embedded = self.embedding(x)
        lstm_out, (h_n, c_n) = self.lstm(embedded)
        # 拼接正向和反向最后一层隐状态
        sentence_rep = torch.cat((h_n[-2], h_n[-1]), dim=1)
        return sentence_rep

# 假设我们有一个简单的字符词汇表
char2idx = {char: idx for idx, char in enumerate("abcdefghijklmnopqrstuvwxyz ")}
vocab_size = len(char2idx)
embed_dim = 50
hidden_dim = 20
num_layers = 1

# 将句子转化为字符索引
def sentence_to_indices(sentence, char2idx):
    return torch.tensor([char2idx[char] for char in sentence.lower()], dtype=torch.long).unsqueeze(0)

# 节点标签
node_labels = ["doorOPEN", "lightON", "turnOnTV"]
node_labels = [label.lower() for label in node_labels]
input_seqs = [sentence_to_indices(label, char2idx) for label in node_labels]

# 创建双向LSTM模型并获取节点表示
lstm_encoder = BiCharLSTMEncoder(vocab_size, embed_dim, hidden_dim, num_layers)
node_embeddings = torch.stack([lstm_encoder(seq).squeeze(0) for seq in input_seqs])
print(node_embeddings)

#创建用户query
query = "the door is open"
query_seq = sentence_to_indices(query, char2idx)
query_embedding = lstm_encoder(query_seq).squeeze(0)
print(query_embedding)

# 定义图数据
data = Data()
data.x = node_embeddings

# 边的连接信息
edge_index = torch.tensor([[0, 1], 
                           [1, 2]], dtype=torch.long)

data.edge_index = edge_index


class SimpleGGNN(nn.Module):
    def __init__(self, in_channels, out_channels, num_layers):
        super(SimpleGGNN, self).__init__()
        self.lin = nn.Linear(in_channels, out_channels)
        self.convs = nn.ModuleList([
            GatedGraphConv(out_channels, num_layers) for _ in range(num_layers)
        ])
    
    def forward(self, x, edge_index):
        x = self.lin(x)
        for conv in self.convs:
            x = conv(x, edge_index)
        return x

# 创建GGNN模型并进行前向传播
in_channels = node_embeddings.size(1)
out_channels = 32
num_layers = 3

model = SimpleGGNN(in_channels, out_channels, num_layers)

# 获取图的节点表示
node_representations = model(data.x, data.edge_index)
print(node_representations)
