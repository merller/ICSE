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

# 从 JSON 文件加载代码数据
data_path = "dataSet/scene/Scene.json"
with open(data_path, 'r', encoding='utf-8') as f:
    code_data = json.load(f)

# 统计变量
n = 0
Q = len(code_data)

# 对每个accurate_docstring进行查询并计算相似度
for idx, query_item in enumerate(code_data):
    query = query_item["accurate_docstring"]
    query_inputs = tokenizer(query, return_tensors="pt", padding=True, truncation=True).to(device)
    query_embedding = encoder_model(**query_inputs).last_hidden_state.mean(dim=1)
    
    similarities = []

    for item in code_data:
        code = item["code"]
        code_inputs = tokenizer(code, return_tensors="pt", padding=True, truncation=True).to(device)
        code_embedding = encoder_model(**code_inputs).last_hidden_state.mean(dim=1)
        
        # 计算余弦相似度
        cosine_sim = torch.nn.functional.cosine_similarity(query_embedding, code_embedding, dim=-1)
        
        similarities.append((cosine_sim.item(), item["code"], item["accurate_docstring"]))

    # 根据相似度排序
    similarities.sort(reverse=True, key=lambda x: x[0])

    # 设置successRate@K
    top_3_similarities = similarities[:10]#K
    for sim, code, docstring in top_3_similarities:
        if docstring == query:
            n += 1
            break  # 统计一个就够了，跳出循环

# 计算m/Q
m_over_Q = n / Q
print(f"m/Q: {m_over_Q}")
