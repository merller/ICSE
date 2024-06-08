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
query = "Monitor soil moisture, and if the soil is too dry, start the watering system; if the soil is too wet, stop the watering.Environmental monitoring: Periodically monitor light intensity, temperature, and humidity, and display the data on an electronic screen.Play nature sounds: When there is movement at the garden gate, play nature sounds like bird chirping and flowing water.Plant growth tracking: Every 24 hours, capture images of plants using a smart camera and send the images to a mobile phone.Smart control: Turn on the supplementary lights at night and activate lights when there is movement at the garden gate."

# 读取 JSON 数据集
#data_path = "dataSet/smartAPP/dataset.json"
data_path = "dataSet/scene/Scene.json"
with open(data_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

# 提取前100个代码片段及其行号
code_snippets_with_lines = [(item['code'], idx + 1) for idx, item in enumerate(data)]
code_snippets = [item[0] for item in code_snippets_with_lines]

# 预处理输入
query_inputs = tokenizer(query, return_tensors="pt").to(device)
code_inputs = tokenizer(code_snippets, padding=True, truncation=True, return_tensors="pt").to(device)

# 计算查询和代码片段的嵌入向量
with torch.no_grad():
    query_embedding = encoder_model(**query_inputs).last_hidden_state.mean(dim=1)
    code_embeddings = encoder_model(**code_inputs).last_hidden_state.mean(dim=1)

# 计算余弦相似度
cosine_sim = torch.nn.functional.cosine_similarity(query_embedding, code_embeddings, dim=-1)

# 获取相似度最高的前三个代码片段
top_k = 3
top_k_values, top_k_indices = torch.topk(cosine_sim, top_k)

# 打印结果
print(f"Query: {query}\n")
for idx, (index, score) in enumerate(zip(top_k_indices, top_k_values)):
    code_snippet, line_number = code_snippets_with_lines[index]
    print(f"Code snippet {idx + 1} (line {6*line_number-3}): {code_snippet}")
    print(f"Similarity score: {score.item()}\n")
