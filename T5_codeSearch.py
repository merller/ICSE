import json
import torch
from transformers import RobertaTokenizer, T5ForConditionalGeneration, T5EncoderModel

# 加载本地 CodeT5 模型和分词器
model_dir = "dataSet/local_codet5_large"
tokenizer = RobertaTokenizer.from_pretrained(model_dir)
model = T5ForConditionalGeneration.from_pretrained(model_dir)
encoder_model = T5EncoderModel.from_pretrained(model_dir)

# 将模型移动到 GPU（如果可用）
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)
encoder_model.to(device)

# 输入查询
query = "When the entrance sensor detects someone entering and there is no one in the gym, turn on the lights, activate the smart sockets for the gym equipment, set the fan to 1000 rpm, and broadcast ‘Welcome’. Increase the people counter. When the exit sensor detects someone leaving and there is only one person in the gym, turn off the lights and deactivate the smart sockets for the gym equipment, and broadcast ‘Have a good day’. Decrease the people counter. Turn on the air purifier."

# 分词
query_inputs = tokenizer(query, return_tensors="pt").to(device)
# 编码查询
query_embedding = encoder_model(**query_inputs).last_hidden_state.mean(dim=1)

# 从 JSON 文件加载代码数据
data_path = "dataSet/scene/Scene.json"
with open(data_path, 'r', encoding='utf-8') as f:
    code_data = json.load(f)

# 计算每个代码片段的嵌入和余弦相似度
similarities = []

for item in code_data:
    code = item["code"]
    code_inputs = tokenizer(code, padding=True, truncation=True, return_tensors="pt").to(device)
    code_embedding = encoder_model(**code_inputs).last_hidden_state.mean(dim=1)
    
    # 计算余弦相似度
    cosine_sim = torch.nn.functional.cosine_similarity(query_embedding, code_embedding, dim=-1)
    
    similarities.append((cosine_sim.item(), code))


# 根据相似度排序，并输出相似度最高的前三个代码片段
similarities.sort(reverse=True, key=lambda x: x[0])

print("Query:", query)
top_3_similarities = similarities[:3]
for i, (sim, code) in enumerate(top_3_similarities, 1):
    print(f"Top {i} Similarity: {sim}")
    print("Code:", code)
    print()
