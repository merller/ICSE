import torch
import os
from transformers import BertTokenizer, BertModel, BertConfig

# 指定本地文件路径
model_dir = 'dataSet/bert-base-uncased/'

# 加载本地的BERT模型和分词器
tokenizer = BertTokenizer.from_pretrained(model_dir)
config = BertConfig.from_pretrained(model_dir)
model = BertModel.from_pretrained(model_dir, config=config)

# 将句子转换为BERT模型的输入格式
sentence1 = "When the entrance sensor detects someone entering and there is no one in the gym, turn on the lights, activate the smart sockets for the gym equipment, set the fan to 1000 rpm, and broadcast ‘Welcome’. Increase the people counter. When the exit sensor detects someone leaving and there is only one person in the gym, turn off the lights and deactivate the smart sockets for the gym equipment, and broadcast ‘Have a good day’. Decrease the people counter. Turn on the air purifier."
sentence2 = "turn On Light"
sentence3 = "turn on the light"

# 将句子大小写转换为小写
sentence1 = sentence1.lower()
sentence2 = sentence2.lower()
sentence3 = sentence3.lower()

# 定义一个函数来处理输入并生成BERT编码
def encode_sentence(sentence):
    inputs = tokenizer(sentence, return_tensors='pt', truncation=True, padding='max_length', max_length=150)
    with torch.no_grad():
        outputs = model(**inputs)
    return outputs.last_hidden_state.mean(dim=1)

# 获取句子的编码
sentence_encoding1 = encode_sentence(sentence1)
sentence_encoding2 = encode_sentence(sentence2)
sentence_encoding3 = encode_sentence(sentence3)

# 计算余弦相似度
def cosine_similarity(vector1, vector2):
    dot_product = torch.dot(vector1, vector2)
    norm_vector1 = torch.norm(vector1)
    norm_vector2 = torch.norm(vector2)
    similarity = dot_product / (norm_vector1 * norm_vector2)
    return similarity

similarity1_2 = cosine_similarity(sentence_encoding1[0], sentence_encoding2[0])
similarity2_3 = cosine_similarity(sentence_encoding2[0], sentence_encoding3[0])

print("句子编码1:", sentence_encoding1)
# print("句子编码2:", sentence_encoding2)
# print("句子编码3:", sentence_encoding3)

print("句子1和句子2的相似度:", similarity1_2.item())
print("句子2和句子3的相似度:", similarity2_3.item())

# # 创建存放数据的文件夹
# output_dir = 'dataSet/Intermediate_data'
# os.makedirs(output_dir, exist_ok=True)

# # 保存句子编码
# torch.save(sentence_encoding1, os.path.join(output_dir, 'sentence_encoding1.pt'))
# torch.save(sentence_encoding2, os.path.join(output_dir, 'sentence_encoding2.pt'))
# torch.save(sentence_encoding3, os.path.join(output_dir, 'sentence_encoding3.pt'))
