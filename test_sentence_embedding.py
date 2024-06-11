import json
import torch
from transformers import RobertaTokenizer, T5ForConditionalGeneration, T5EncoderModel

# 加载本地 CodeT5 模型和分词器
model_dir = "dataSet/local_codet5_base"
tokenizer = RobertaTokenizer.from_pretrained(model_dir)
model = T5ForConditionalGeneration.from_pretrained(model_dir)
encoder_model = T5EncoderModel.from_pretrained(model_dir)

# 将模型移动到 GPU（如果可用）
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)
encoder_model.to(device)

# 输入查询
query = "When the entrance sensor detects someone entering and there is no one in the gym, turn on the lights, activate the smart sockets for the gym equipment, set the fan to 1000 rpm, and broadcast ‘Welcome’. Increase the people counter. When the exit sensor detects someone leaving and there is only one person in the gym, turn off the lights and deactivate the smart sockets for the gym equipment, and broadcast ‘Have a good day’. Decrease the people counter. Turn on the air purifier."
query1 = "When the entrance sensor detects someone entering and there is no one in the gym, turn on the lights, activate the smart sockets for the gym equipment, set the fan to 1000 rpm, and broadcast ‘Welcome’. Increase the people counter. When the exit sensor detects someone leaving and there is only one person in the gym, turn off the lights and deactivate the smart sockets for the gym equipment, and broadcast ‘Have a good day’. Decrease the people counter. Turn on the air purifier."
query2 = "When the entrance sensor detects someone entering and there is no one in the gym, turn on the lights, activate the smart sockets for the gym equipment, set the fan to 1000 rpm, and broadcast ‘Welcome’. Increase the people counter. When the exit sensor detects someone leaving and there is only one person in the gym, turn off the lights and deactivate the smart sockets for the gym equipment, and broadcast ‘Have a good day’. Decrease the people counter. Turn on the air purifier."



#分词
query_inputs = tokenizer(query, return_tensors="pt").to(device)
query_inputs1 = tokenizer(query1, return_tensors="pt").to(device)
query_inputs2 = tokenizer(query1, return_tensors="pt").to(device)



query_embedding = encoder_model(**query_inputs)
query_embedding1 = encoder_model(**query_inputs1)
query_embedding2 = encoder_model(**query_inputs1)


print(query_embedding.last_hidden_state.mean(dim=1).shape)

# 计算余弦相似度
cosine_sim = torch.nn.functional.cosine_similarity(query_embedding.last_hidden_state.mean(dim=1), query_embedding1.last_hidden_state.mean(dim=1), dim=-1)
cosine_sim1 = torch.nn.functional.cosine_similarity(query_embedding.last_hidden_state.mean(dim=1), query_embedding2.last_hidden_state.mean(dim=1), dim=-1)
print(query_embedding.last_hidden_state.mean(dim=1))

print(cosine_sim)
print(cosine_sim1)
