import torch
import torch.nn as nn
import numpy as np
# 假设有一句话
sentence1 = "This is a sample sentence."
sentence2 = "This is a complex sentence."
# 构建字符级别的嵌入字典
char_to_idx = {char: idx + 1 for idx, char in enumerate("abcdefghijklmnopqrstuvwxyz")}
char_to_idx['<pad>'] = 0  # 用于填充序列

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

def cosine_similarity(matrix1, matrix2):
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


# 将句子1转换为字符级别的表示
max_word_length = max(len(word) for word in sentence1.split())
char_indices = [[char_to_idx.get(char, 0) for char in word] for word in sentence1.split()]
padded_char_indices = [indices + [0] * (max_word_length - len(indices)) for indices in char_indices]

# 将句子2转换为字符级别的表示
max_word_length = max(len(word) for word in sentence2.split())
char_indices2 = [[char_to_idx.get(char, 0) for char in word] for word in sentence2.split()]
padded_char_indices2 = [indices + [0] * (max_word_length - len(indices)) for indices in char_indices2]
# 调整为 batch_first 格式，即 (batch_size, sequence_length, input_size)
char_tensor = torch.tensor(padded_char_indices)  # 添加 batch 和 sequence 维度
char_tensor2 = torch.tensor(padded_char_indices2)  # 添加 batch 和 sequence 维度

# 定义模型并进行编码
input_size = len(char_to_idx)
hidden_size = 4
num_layers = 1
encoder = CharLSTMEncoder(input_size, hidden_size, num_layers)
with torch.no_grad():
  sentence_encoding1 = encoder(char_tensor)
  sentence_encoding2 = encoder(char_tensor2)
print("句子编码1:", sentence_encoding1)
print("句子编码2:", sentence_encoding2)

#print("句子编码:", cosine_similarity(sentence_encoding1,sentence_encoding2))

