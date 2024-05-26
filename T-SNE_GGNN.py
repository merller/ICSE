import torch
from sklearn.manifold import TSNE
import matplotlib.pyplot as plt
import os

# 设置文件路径
output_dir = 'dataSet/Intermediate_data'
output_path = os.path.join(output_dir, 'output.pt')

# 读取图编码
output = torch.load(output_path)

# 将Tensor转换为NumPy数组
output_np = output.cpu().detach().numpy()

# 使用TSNE降维
tsne = TSNE(n_components=2, random_state=42)
output_2d = tsne.fit_transform(output_np)

# 可视化
plt.figure(figsize=(8, 6))
plt.scatter(output_2d[:, 0], output_2d[:, 1], c='blue', edgecolor='k')
plt.title("T-SNE visualization of graph embeddings")
plt.xlabel("Dimension 1")
plt.ylabel("Dimension 2")
plt.show()
