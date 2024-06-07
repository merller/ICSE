import torch
import numpy as np

# 定义读取并进行平均池化的函数
def read_and_average_pooling(file_path):
    # 从文件读取数据
    data = torch.load(file_path)
    # 对矩阵的每一行向量进行平均池化
    pooled_data = torch.mean(data, dim=0, keepdim=True)
    return pooled_data

# 定义计算余弦相似度的函数
def cosine_similarity(vec1, vec2):
    vec1 = vec1.detach().cpu().numpy()
    vec2 = vec2.detach().cpu().numpy()
    dot_product = np.dot(vec1, vec2.T)
    norm_vec1 = np.linalg.norm(vec1)
    norm_vec2 = np.linalg.norm(vec2)
    similarity = dot_product / (norm_vec1 * norm_vec2)
    return similarity

# 读取并进行平均池化
lstm_file_path = 'dataSet/Intermediate_data/sentence_encoding1.pt'
ggnn_file_path = 'dataSet/Intermediate_data/output.pt'

lstm_pooled = read_and_average_pooling(lstm_file_path)
ggnn_pooled = read_and_average_pooling(ggnn_file_path)

# 计算余弦相似度
similarity = cosine_similarity(lstm_pooled, ggnn_pooled)

print("余弦相似度：", similarity)
