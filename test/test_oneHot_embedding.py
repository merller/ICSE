import numpy as np

# 构建词汇表
vocab = ["TVOn", "LightOn", "cherry", "date", "elderberry", "fig", "grape"]

# 生成词汇表索引
word_to_index = {word: idx for idx, word in enumerate(vocab)}

# 将单词转换为 one-hot 编码
def one_hot_encode(word, vocab_size):
    one_hot = np.zeros(vocab_size)
    index = word_to_index.get(word, -1)
    if index != -1:
        one_hot[index] = 1
    return one_hot

# 计算余弦相似度
def cosine_similarity(vec1, vec2):
    dot_product = np.dot(vec1, vec2)
    norm_vec1 = np.linalg.norm(vec1)
    norm_vec2 = np.linalg.norm(vec2)
    similarity = dot_product / (norm_vec1 * norm_vec2)
    return similarity

# 示例单词
word1 = vocab[0]
word2 = vocab[1]

# 词汇表大小
vocab_size = len(vocab)

# 对单词进行 one-hot 编码
one_hot_word1 = one_hot_encode(word1, vocab_size)
one_hot_word2 = one_hot_encode(word2, vocab_size)

print(f"One-hot 编码 - {word1}: {one_hot_word1}")
print(f"One-hot 编码 - {word2}: {one_hot_word2}")

# 计算余弦相似度
similarity = cosine_similarity(one_hot_word1, one_hot_word2)
print(f"余弦相似度: {similarity}")
