import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import DataLoader, Dataset
import json
import random
from attention_LSTM import LSTMWithAttention

data_path = 'dataSet/scene/Scene.json'

class CustomDataset(Dataset):
    def __init__(self, data_path):
        with open(data_path, 'r') as f:
            self.data = json.load(f)
    
    def __len__(self):
        return len(self.data)
    
    def __getitem__(self, idx):
        item = self.data[idx]
        code = torch.tensor(item['code'], dtype=torch.float32)
        pos_desc = torch.tensor(item['docstring'], dtype=torch.float32)
        
        # 选择一个随机的负样本
        neg_idx = random.choice(range(len(self.data)))
        while neg_idx == idx:
            neg_idx = random.choice(range(len(self.data)))
        neg_item = self.data[neg_idx]
        neg_desc = torch.tensor(neg_item['docstring'], dtype=torch.float32)
        
        return code, pos_desc, neg_desc

# 定义数据集和数据加载器
dataset = CustomDataset(data_path)
data_loader = DataLoader(dataset, batch_size=32, shuffle=True)

# 定义GGNN模型
class GGNN(nn.Module):
    def __init__(self, input_size, hidden_size):
        super(GGNN, self).__init__()
        self.fc = nn.Linear(input_size, hidden_size)
        self.attention = nn.Linear(hidden_size, 1)
    
    def forward(self, x):
        x = self.fc(x)
        attn_weights = torch.softmax(self.attention(x), dim=1)
        attn_output = torch.sum(attn_weights * x, dim=1)
        return attn_output


# 定义余弦相似度函数
def cosine_similarity_torch(x, y):
    return torch.nn.functional.cosine_similarity(x, y)

# 定义自定义损失函数
def custom_loss(c, d_pos, d_neg, b):
    cos_c_d_pos = cosine_similarity_torch(c, d_pos)
    cos_c_d_neg = cosine_similarity_torch(c, d_neg)
    loss = torch.clamp(b - cos_c_d_pos + cos_c_d_neg, min=0.0)
    return loss.mean()

# 初始化模型、优化器和超参数
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
ggnn = GGNN(input_size=100, hidden_size=128).to(device)
lstm = LSTMWithAttention(input_size=100, hidden_size=128).to(device)
optimizer = optim.Adam(list(ggnn.parameters()) + list(lstm.parameters()), lr=0.001)
b = 0.1  # 常量 b

# 训练循环
num_epochs = 10
for epoch in range(num_epochs):
    total_loss = 0.0
    for code, pos_desc, neg_desc in data_loader:
        code, pos_desc, neg_desc = code.to(device), pos_desc.to(device), neg_desc.to(device)
        
        # 假设 code, pos_desc, neg_desc 已经是适当形状的张量
        code_encoded = ggnn(code)
        pos_desc_encoded = lstm(pos_desc)
        neg_desc_encoded = lstm(neg_desc)
        
        loss = custom_loss(code_encoded, pos_desc_encoded, neg_desc_encoded, b)
        
        optimizer.zero_grad()
        loss.backward()
        optimizer.step()
        
        total_loss += loss.item()
    
    print(f'Epoch {epoch + 1}/{num_epochs}, Loss: {total_loss/len(data_loader)}')

print("Training complete.")
