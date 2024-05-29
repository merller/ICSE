# 示例代码：节点特征维度为词嵌入向量的维度
import torch
import json
import os
import torch.nn.functional as F
from torch_geometric.nn import GatedGraphConv
from torch_geometric.data import Data, Batch
from gensim.models import KeyedVectors
import numpy as np

# 加载预训练的词嵌入模型 (假设词嵌入模型已准备好)
glove_path = 'dataSet/glove/glove.6B.50d.txt'  # 修改为实际路径
word_vectors = KeyedVectors.load_word2vec_format(glove_path, binary=False, no_header=True)

# 将字符串特征转换为glove嵌入向量
def get_feature_vector(word):
    try:
        return word_vectors[word]
    except KeyError:
        return [0] * word_vectors.vector_size  # 返回零向量表示未找到的词



# 将单词转换为 one-hot 编码
def one_hot_encode(word, vocab_size):
    one_hot = np.zeros(vocab_size)
    index = word_to_index.get(word, -1)
    if index != -1:
        one_hot[index] = 1
    return one_hot

# 设置文件路径
output_dir = 'dataSet/Intermediate_data'
node_features_path = os.path.join(output_dir, 'node_features_str_1.json')
edge_index_path = os.path.join(output_dir, 'edge_index_1.pt')
edge_attr_path = os.path.join(output_dir, 'edge_attr.pt')

# 读取节点信息
with open(node_features_path, 'r') as f:
    node_features_str_1 = json.load(f)

# 读取边信息
edge_index_1 = torch.load(edge_index_path)
#edge_attr = torch.load(edge_attr_path)

# 输出到控制台
print("Node Features:")
print(node_features_str_1)

print("\nEdge Index:")
print(edge_index_1)

# 示例图1
node_features_1 = [get_feature_vector(word) for word in node_features_str_1]
x_1 = torch.tensor(node_features_1, dtype=torch.float)

#使用one-hot编码进行编码
# 生成词汇表索引
word_to_index = {word: idx for idx, word in enumerate(node_features_str_1)}
node_features_2 = [one_hot_encode(word,len(node_features_str_1)) for word in node_features_str_1]
x_2 = torch.tensor(node_features_2, dtype=torch.float)

# 构建图数据对象
data_1 = Data(x=x_2, edge_index=edge_index_1)

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

def cosine_similarity(vec1, vec2):
    dot_product = np.dot(vec1, vec2)
    norm_vec1 = np.linalg.norm(vec1)
    norm_vec2 = np.linalg.norm(vec2)
    similarity = dot_product / (norm_vec1 * norm_vec2)
    return similarity

# 检查是否有GPU可用
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
print(f"Using device: {device}")

# 初始化模型
in_channels = data_1.num_node_features  # 节点特征维度
out_channels = 55  # 输出的维度，可以根据需要调整
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

