import torch
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

# 示例图1
node_features_str_1 = ["TVon", "TVoff", "cherry", "date"]
#使用one-hot编码进行编码
# 生成词汇表索引
word_to_index = {word: idx for idx, word in enumerate(node_features_str_1)}
node_features_2 = [one_hot_encode(word,len(node_features_str_1)) for word in node_features_str_1]
x_2 = torch.tensor(node_features_2, dtype=torch.float)

# 生成边信息，其中有两种类型的边
edge_index_1 = torch.tensor([[0, 1, 2, 3, 0, 1, 0, 1, 2, 3, 0, 1],
                              [1, 2, 3, 0, 2, 3, 2, 3, 0, 1, 0, 1]], dtype=torch.long)
edge_attr = torch.tensor([0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0], dtype=torch.long)  # 边的类型编码

# 构建图数据对象
data_1 = Data(x=x_2, edge_index=edge_index_1, edge_attr=edge_attr)

# 定义GGNN模型
class GGNN(torch.nn.Module):
    def __init__(self, in_channels, out_channels, num_layers, edge_types):
        super(GGNN, self).__init__()
        self.conv = GatedGraphConv(out_channels, num_layers)
        self.edge_embedding = torch.nn.Embedding(edge_types, out_channels)
        self.linear = torch.nn.Linear(out_channels, out_channels)

    def forward(self, x, edge_index, edge_attr):
        edge_embeddings = self.edge_embedding(edge_attr)
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
out_channels = 50  # 输出的维度，可以根据需要调整
num_layers = 3  # GGNN层数
edge_channels = 2  # 边特征维度
model = GGNN(in_channels, out_channels, num_layers, edge_channels).to(device)

# 将数据移动到GPU
data_1 = data_1.to(device)

# 运行模型
output = model(data_1.x, data_1.edge_index, data_1.edge_attr)

print("输出向量大小：", output.shape)
print("输出向量：", output)

# 从模型输出中提取第一个向量和第二个向量
vector1 = output[0].cpu().detach().numpy()
vector2 = output[1].cpu().detach().numpy()

# 计算余弦相似度
similarity = cosine_similarity(vector1, vector2)
print("第一个向量和第二个向量的余弦相似度:", similarity)
