import torch
import json
import os
import torch.nn.functional as F
from torch_geometric.nn import GatedGraphConv
from torch_geometric.data import Data, Batch
import numpy as np

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
node_features_path = os.path.join(output_dir, 'node_features_str_1.json')
edge_index_path = os.path.join(output_dir, 'edge_index_1.pt')
edge_attr_path = os.path.join(output_dir, 'edge_attr.pt')

edge_index_1 = torch.tensor([[0, 1],
                             [2, 2]], dtype=torch.long)
node_features_str_1 = ["LightOn", "DoorOpen", "OnTV"]

# 输出到控制台
print("Node Features:")
print(node_features_str_1)

print("\nEdge Index:")
print(edge_index_1)

# 确定最大节点标签长度
max_length = max(len(label) for label in node_features_str_1)

# 将节点标签编码为索引
node_features_encoded = [char_to_index_encode(label.lower(), max_length) for label in node_features_str_1]
x_encoded = torch.tensor(node_features_encoded, dtype=torch.float)

# 构建图数据对象
data_1 = Data(x=x_encoded, edge_index=edge_index_1)

# 定义GGNN模型
class GGNN(torch.nn.Module):
    def __init__(self, in_channels, out_channels, num_layers):
        super(GGNN, self).__init__()
        self.conv = GatedGraphConv(out_channels, num_layers)
        self.linear = torch.nn.Linear(out_channels, out_channels)
        
    def forward(self, x, edge_index):
        x = self.conv(x, edge_index)
        x = F.relu(x)
        x = self.linear(x)
        return x

# 检查是否有GPU可用
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
print(f"Using device: {device}")

# 初始化模型
in_channels = data_1.num_node_features  # 节点特征维度
out_channels = 30  # 输出的维度，可以根据需要调整
num_layers = 3  # GGNN层数
model = GGNN(in_channels, out_channels, num_layers).to(device)

# 将数据移动到GPU
data_1 = data_1.to(device)

# 运行模型
output = model(data_1.x, data_1.edge_index)

print("输出向量大小：", output.shape)
print("输出向量：", output)

# 创建存放数据的文件夹
output_dir = 'dataSet/Intermediate_data'
os.makedirs(output_dir, exist_ok=True)

# 将节点信息和边信息写入文件
output_path = os.path.join(output_dir, 'output.pt')
torch.save(output, output_path)
