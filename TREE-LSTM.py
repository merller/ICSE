import os
import json
import torch
import numpy as np
import torch.nn as nn
import torch.nn.functional as F

# 定义路径
output_dir = 'dataSet/Intermediate_data'
node_features_path = os.path.join(output_dir, 'node_features_str_1.json')
edge_index_path = os.path.join(output_dir, 'edge_index_1.pt')

# 读取节点标签
with open(node_features_path, 'r') as f:
    node_features_str_1 = json.load(f)

# 读取边信息
edge_index_1 = torch.load(edge_index_path)


# 生成词汇表索引
word_to_index = {word: idx for idx, word in enumerate(node_features_str_1)}

# 将单词转换为 one-hot 编码
def one_hot_encode(word, vocab_size):
    one_hot = np.zeros(vocab_size)
    index = word_to_index.get(word, -1)
    if index != -1:
        one_hot[index] = 1
    return one_hot

vocab_size = len(node_features_str_1)
node_features_one_hot = [one_hot_encode(word, vocab_size) for word in node_features_str_1]
x = torch.tensor(node_features_one_hot, dtype=torch.float)



class TreeLSTM(nn.Module):
    def __init__(self, input_dim, hidden_dim):
        super(TreeLSTM, self).__init__()
        self.input_dim = input_dim
        self.hidden_dim = hidden_dim
        self.ioux = nn.Linear(input_dim, 3 * hidden_dim)
        self.iouh = nn.Linear(hidden_dim, 3 * hidden_dim)
        self.fx = nn.Linear(input_dim, hidden_dim)
        self.fh = nn.Linear(hidden_dim, hidden_dim)
    
    def node_forward(self, x, child_c, child_h):
        child_h_sum = torch.sum(child_h, dim=0, keepdim=True)
        iou = self.ioux(x) + self.iouh(child_h_sum)
        i, o, u = torch.split(iou, iou.size(1) // 3, dim=1)
        i, o, u = torch.sigmoid(i), torch.sigmoid(o), torch.tanh(u)
        f = torch.sigmoid(self.fh(child_h) + self.fx(x).repeat(len(child_h), 1))
        fc = torch.mul(f, child_c)
        c = torch.mul(i, u) + torch.sum(fc, dim=0, keepdim=True)
        h = torch.mul(o, torch.tanh(c))
        return c, h
    
    def forward(self, x, edge_index):
        n = x.size(0)
        c = x.new_zeros(n, self.hidden_dim)
        h = x.new_zeros(n, self.hidden_dim)
        for node in range(n):
            child_index = (edge_index[0] == node).nonzero(as_tuple=True)[0]
            child_c = c[edge_index[1, child_index]]
            child_h = h[edge_index[1, child_index]]
            c[node], h[node] = self.node_forward(x[node], child_c, child_h)
        return h
# 检查是否有GPU可用
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
print(f"Using device: {device}")

# 初始化模型
input_dim = vocab_size  # 节点特征维度
hidden_dim = 50  # Tree-LSTM隐藏层维度，可以根据需要调整
model = TreeLSTM(input_dim, hidden_dim).to(device)

# 将数据移动到GPU
x = x.to(device)
edge_index_1 = edge_index_1.to(device)

# 运行模型
output = model(x, edge_index_1)

print("输出向量大小：", output.shape)
print("输出向量：", output)

# 创建存放数据的文件夹
output_path = os.path.join(output_dir, 'tree_lstm_output.pt')
torch.save(output, output_path)
