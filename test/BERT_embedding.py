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
sentence1 = "The morning routine ensures the greenhouse environment is set up for optimal plant growth by controlling temperature to 25°C, humidity to 60%, turning on the greenhouse lighting, and watering plants in zone 1 where soil moisture is monitored."
sentence2 = "The night security routine includes locking both the front and back doors, activating perimeter security lighting, and activating the security alarm system to ensure comprehensive protection."
sentence3 = "turn on the light"
query = "The night security routine includes locking both the front and back doors, activating perimeter security lighting, and activating the security alarm system to ensure comprehensive protection."

code="eveningGreenhouseRoutine event.eveningGreenhouseRoutine controlTemperature(22) controlHumidity(70) controlLighting('off') waterPlants('zone3')"

code1="nightSecurityRoutine event.nightSecurityRoutine controlDoorLock('front', 'lock') controlDoorLock('back', 'lock') adjustSecurityLighting('perimeter', 'on') activateAlarm()"


# 将句子大小写转换为小写
sentence1 = query.lower()
sentence2 = code.lower()
sentence3 = code1.lower()

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


similarity1_2 = torch.nn.functional.cosine_similarity(sentence_encoding1, sentence_encoding2)
similarity2_3 = torch.nn.functional.cosine_similarity(sentence_encoding1, sentence_encoding3)

#print("句子编码1:", sentence_encoding1)
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
