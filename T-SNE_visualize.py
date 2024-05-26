import torch
import os
import matplotlib.pyplot as plt
from sklearn.manifold import TSNE

# 假设有一句话
sentence1 = "When the light is on and the door is open, turn on the TV."
#sentence1 = "When it is Friday, send my friend an email and plus the invite times. If he reply no,plus the reject time and if the reject time equal the invite time, send he another email."

# 定义路径
output_dir = 'dataSet/Intermediate_data'
file_path = os.path.join(output_dir, 'sentence_encoding1.pt')

# 读取句子编码
sentence_encoding1 = torch.load(file_path)

# 检查编码数据
print("句子编码1形状:", sentence_encoding1.shape)

# 使用 t-SNE 进行降维
# 调整 perplexity 参数，使其小于样本数量
tsne = TSNE(n_components=2, perplexity=5, random_state=42)
sentence_encoding1_2d = tsne.fit_transform(sentence_encoding1.numpy())

# 可视化
plt.figure(figsize=(10, 8))
plt.scatter(sentence_encoding1_2d[:, 0], sentence_encoding1_2d[:, 1], marker='o',c='red')

# 标注每个单词
words = sentence1.split()
for i, word in enumerate(words):
    plt.annotate(word, (sentence_encoding1_2d[i, 0], sentence_encoding1_2d[i, 1]), fontsize=12)

plt.title("t-SNE Visualization of Sentence Encoding")
plt.xlabel("t-SNE Dimension 1")
plt.ylabel("t-SNE Dimension 2")
plt.grid(True)
plt.show()
