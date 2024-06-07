import torch
import torch.nn as nn
import torch.optim as optim

class LSTMEncoder(nn.Module):
    def __init__(self, input_dim, hidden_dim, num_layers):
        super(LSTMEncoder, self).__init__()
        self.lstm = nn.LSTM(input_dim, hidden_dim, num_layers, batch_first=True)
    
    def forward(self, x):
        outputs, _ = self.lstm(x)
        return outputs

class Attention(nn.Module):
    def __init__(self, hidden_dim):
        super(Attention, self).__init__()
        self.W = nn.Linear(hidden_dim, hidden_dim, bias=True)
        self.u = nn.Parameter(torch.randn(hidden_dim))
    
    def forward(self, encoder_outputs):
        scores = torch.tanh(self.W(encoder_outputs))
        scores = scores @ self.u
        alpha = torch.softmax(scores, dim=1)
        return alpha

class LSTMWithAttention(nn.Module):
    def __init__(self, input_dim, hidden_dim, num_layers):
        super(LSTMWithAttention, self).__init__()
        self.encoder = LSTMEncoder(input_dim, hidden_dim, num_layers)
        self.attention = Attention(hidden_dim)
    
    def forward(self, x):
        encoder_outputs = self.encoder(x)
        alpha = self.attention(encoder_outputs)
        alpha = alpha.unsqueeze(-1)
        context_vector = (encoder_outputs * alpha).sum(dim=1)
        return context_vector

# 示例参数
input_dim = 100
hidden_dim = 128
num_layers = 2
batch_size = 32
seq_len = 50
num_epochs = 50

# 示例数据
x = torch.randn(batch_size, seq_len, input_dim)
targets = torch.randint(0, 2, (batch_size,))

# 模型、损失函数和优化器
model = LSTMWithAttention(input_dim, hidden_dim, num_layers)
criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=0.001)

# 示例训练循环
for epoch in range(num_epochs):
    optimizer.zero_grad()
    outputs = model(x)
    loss = criterion(outputs, targets)
    loss.backward()
    optimizer.step()

    print(f'Epoch {epoch+1}, Loss: {loss.item()}')
