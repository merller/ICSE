import torch
import torch.nn as nn
import numpy as np

# 定义字符级嵌入和LSTM编码器
class CharLSTMEncoder(nn.Module):
    def __init__(self, vocab_size, embed_dim, hidden_dim, num_layers):
        super(CharLSTMEncoder, self).__init__()
        self.embedding = nn.Embedding(vocab_size, embed_dim)
        self.lstm = nn.LSTM(embed_dim, hidden_dim, num_layers, batch_first=True)
    
    def forward(self, x):
        embedded = self.embedding(x)
        lstm_out, (h_n, c_n) = self.lstm(embedded)
        # 使用最后一层隐状态
        sentence_rep = h_n[-1]
        return sentence_rep

# 定义计算余弦相似度的函数
def cosine_similarity(vec1, vec2):
    vec1 = vec1.detach().cpu().numpy()
    vec2 = vec2.detach().cpu().numpy()
    dot_product = np.dot(vec1, vec2.T)
    norm_vec1 = np.linalg.norm(vec1)
    norm_vec2 = np.linalg.norm(vec2)
    similarity = dot_product / (norm_vec1 * norm_vec2)
    return similarity


# 假设我们有一个简单的字符词汇表
char2idx = {char: idx for idx, char in enumerate("abcdefghijklmnopqrstuvwxyz ")}
vocab_size = len(char2idx)
embed_dim = 50
hidden_dim = 20
num_layers = 1

# 将句子转化为字符索引
sentence = "turn on the TV and then open the music player"
sentence2 = "turnOnTV"
sentence3 = "open the music player"

input_seq = torch.tensor([char2idx[char] for char in sentence.lower()], dtype=torch.long).unsqueeze(0)
input_seq2 = torch.tensor([char2idx[char] for char in sentence2.lower()], dtype=torch.long).unsqueeze(0)
input_seq3 = torch.tensor([char2idx[char] for char in sentence3.lower()], dtype=torch.long).unsqueeze(0)

# 创建模型并获取句子表示
model = CharLSTMEncoder(vocab_size, embed_dim, hidden_dim, num_layers)
sentence_representation = model(input_seq)
sentence_representation2 = model(input_seq2)
sentence_representation3 = model(input_seq3)

print(cosine_similarity(sentence_representation, sentence_representation2))  # 输出应为一个标量
print(cosine_similarity(sentence_representation2, sentence_representation3))  # 输出应为一个标量
#print(sentence_representation)  # 输出形状应为 (batch_size, hidden_dim)
