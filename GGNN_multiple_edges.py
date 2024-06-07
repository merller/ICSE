import torch
import torch.nn.functional as F
from torch_geometric.nn import GatedGraphConv
from torch_geometric.data import Data
from transformers import BertModel, BertTokenizer
import numpy as np
import re
from sklearn.decomposition import PCA

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

# 检查是否有GPU可用
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
print(f"Using device: {device}")

# 加载BERT模型和分词器
bert_model_name = 'dataSet/bert-base-uncased'
tokenizer = BertTokenizer.from_pretrained(bert_model_name)
bert_model = BertModel.from_pretrained(bert_model_name).to(device)

# 示例图1的节点标签
node_features_str_1 = ["LightOn", "DoorOpen", "OnTV"]

# 将节点标签按照驼峰规则拆分成数个单词
def split_camel_case(text):
    return re.sub(r'([a-z])([A-Z])', r'\1 \2', text).split()

# 对节点标签进行embedding
def get_bert_embedding(text_list):
    embeddings = []
    for text in text_list:
        words = split_camel_case(text)
        encoded_input = tokenizer(' '.join(words), return_tensors='pt', padding=True, truncation=True).to(device)
        with torch.no_grad():
            model_output = bert_model(**encoded_input)
        embeddings.append(model_output.last_hidden_state.mean(dim=1).squeeze().cpu().numpy())
    return np.array(embeddings)

# 生成节点特征
x_1 = get_bert_embedding(node_features_str_1)

# 使用PCA进行降维
min_dim = min(x_1.shape[0], x_1.shape[1])  # 确保降维的维度不超过输入数据的最小维度
pca = PCA(n_components=min(min_dim, 50))  # 将维度减少到不超过min_dim
x_1_reduced = pca.fit_transform(x_1)
x_1_reduced = torch.tensor(x_1_reduced, dtype=torch.float).to(device)

# 生成边信息，其中有两种类型的边
edge_index_1 = torch.tensor([[0, 1, 1, 2],
                             [1, 0, 2, 2]], dtype=torch.long)
edge_attr = torch.tensor([0, 0, 1, 1], dtype=torch.long)  # 边的类型编码

# 构建图数据对象
data_1 = Data(x=x_1_reduced, edge_index=edge_index_1, edge_attr=edge_attr)

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

# 从模型输出中提取向量
vectors = output.cpu().detach().numpy()
