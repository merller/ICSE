import torch
import torch.nn as nn
import numpy as np
import os
from gensim.models import KeyedVectors

# 加载预训练的词嵌入模型 (假设词嵌入模型已准备好)
glove_path = 'dataSet/glove/glove.6B.50d.txt'  # 修改为实际路径
word_vectors = KeyedVectors.load_word2vec_format(glove_path, binary=False, no_header=True)

# 将字符串特征转换为glove嵌入向量
def get_feature_vector(word):
    try:
        return word_vectors[word]
    except KeyError:
        return [0] * word_vectors.vector_size  # 返回零向量表示未找到的词


# 假设有一句话
sentence1 = "Turn off your lights when one tap on your phone button."
sentence2 = "turnOnTV"
#sentence3 = "turn on the light"
#sentence3 = "set the light to 50%"
sentence3 = "change the TV channel to 5"
# 构建字符级别的嵌入字典
char_to_idx = {char: idx + 1 for idx, char in enumerate("abcdefghijklmnopqrstuvwxyz")}
char_to_idx['<pad>'] = 0  # 用于填充序列

#句子大小写预处理
# 将句子大小写转换为小写
sentence1 = sentence1.lower()
sentence2 = sentence2.lower()
sentence3 = sentence3.lower()

# 定义字符级别的 LSTM 编码器
class CharLSTMEncoder(nn.Module):
    def __init__(self, input_size, hidden_size, num_layers=1):
        super(CharLSTMEncoder, self).__init__()
        self.embedding = nn.Embedding(input_size, hidden_size)
        self.lstm = nn.LSTM(hidden_size, hidden_size, num_layers=num_layers, batch_first=True)

    def forward(self, x):
        embedded = self.embedding(x)
        output, _ = self.lstm(embedded)
        return output[:, -1, :]  # 返回序列最后一个时间步的输出作为句子的编码

def cosine_similarity_matrix(matrix1, matrix2):
    """
    计算两个矩阵的余弦相似度
    
    参数：
    - matrix1: 第一个矩阵，shape (m, n)
    - matrix2: 第二个矩阵，shape (m, n)
    
    返回：
    - similarity: 余弦相似度
    """
    # 计算矩阵的内积
    dot_product = torch.mm(matrix1, matrix2.t())
    
    # 计算矩阵的范数
    norm_matrix1 = torch.norm(matrix1, dim=1, keepdim=True)
    norm_matrix2 = torch.norm(matrix2, dim=1, keepdim=True)
    
    # 计算余弦相似度
    similarity = dot_product / (norm_matrix1 * norm_matrix2.t())
    
    return similarity

def sum_and_average_columns(matrix):
    # 求每列的和
    column_sums = torch.sum(matrix, dim=0)
    
    # 求矩阵的行数
    num_rows = matrix.size(0)
    
    # 求每列的平均值
    column_averages = column_sums / num_rows
    
    # 创建新的矩阵，行数为1，列数与原矩阵相同
    new_matrix = column_averages.view(1, -1)
    
    return new_matrix

def cosine_similarity(vector1, vector2):
    """
    计算两个向量的余弦相似度
    
    参数：
     - vector1: 第一个向量，shape (n,)
    - vector2: 第二个向量，shape (n,)
        
    返回：
    - similarity: 余弦相似度
    """
    dot_product = torch.dot(vector1, vector2)
    norm_vector1 = torch.norm(vector1)
    norm_vector2 = torch.norm(vector2)
    similarity = dot_product / (norm_vector1 * norm_vector2)
    return similarity
# 将句子1转换为字符级别的表示
max_word_length = max(len(word) for word in sentence1.split())
char_indices = [[char_to_idx.get(char, 0) for char in word] for word in sentence1.split()]
padded_char_indices = [indices + [0] * (max_word_length - len(indices)) for indices in char_indices]

# 将句子2转换为字符级别的表示
max_word_length = max(len(word) for word in sentence2.split())
char_indices2 = [[char_to_idx.get(char, 0) for char in word] for word in sentence2.split()]
padded_char_indices2 = [indices + [0] * (max_word_length - len(indices)) for indices in char_indices2]

# 将句子3转换为字符级别的表示
max_word_length = max(len(word) for word in sentence3.split())
char_indices3 = [[char_to_idx.get(char, 0) for char in word] for word in sentence3.split()]
padded_char_indices3 = [indices + [0] * (max_word_length - len(indices)) for indices in char_indices3]

# 调整为 batch_first 格式，即 (batch_size, sequence_length, input_size)
char_tensor = torch.tensor(padded_char_indices)  # 添加 batch 和 sequence 维度
char_tensor2 = torch.tensor(padded_char_indices2)  # 添加 batch 和 sequence 维度
char_tensor3 = torch.tensor(padded_char_indices3)  # 添加 batch 和 sequence 维度


# 定义模型并进行编码
input_size = len(char_to_idx)
hidden_size = 20
num_layers = 2
encoder = CharLSTMEncoder(input_size, hidden_size, num_layers)
with torch.no_grad():
  sentence_encoding1 = encoder(char_tensor)
  sentence_encoding2 = encoder(char_tensor2)
  sentence_encoding3 = encoder(char_tensor3)

sentence_encoding1_avg = sum_and_average_columns(sentence_encoding1)
sentence_encoding3_avg = sum_and_average_columns(sentence_encoding3)

print("句子编码1:", sentence_encoding1)
print("句子编码2:", sentence_encoding2)

print("句子编码:", cosine_similarity(sentence_encoding1_avg[0],sentence_encoding2[0]))
print("句子编码:", cosine_similarity(sentence_encoding2[0],sentence_encoding3_avg[0]))

# 创建存放数据的文件夹
output_dir = 'dataSet/Intermediate_data'
os.makedirs(output_dir, exist_ok=True)

# 保存句子编码
torch.save(sentence_encoding1, os.path.join(output_dir, 'sentence_encoding1.pt'))
# torch.save(sentence_encoding2, os.path.join(output_dir, 'sentence_encoding2.pt'))