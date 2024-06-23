import json
import torch
import re
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

def split_camel_case(name):
    # 使用正则表达式拆分驼峰命名法单词
    return re.sub('([a-z])([A-Z])', r'\1 \2', name).split()

def preprocess_code(code):
    # 匹配所有的驼峰命名法单词
    camel_case_words = re.findall(r'[a-zA-Z][a-z]*[A-Z][a-zA-Z]*', code)
    for word in camel_case_words:
        # 拆分驼峰命名法单词
        split_words = split_camel_case(word)
        # 用拆分后的单词替换原始单词
        code = code.replace(word, ' '.join(split_words))
    return code

def remove_single_line_comments(code):
    # 使用正则表达式匹配并删除//后的注释
    cleaned_code = re.sub(r'//.*', '', code)
    return cleaned_code

# 从 JSON 文件加载代码数据
data_path = "dataSet/scene/Scene.json"
with open(data_path, 'r', encoding='utf-8') as f:
    code_data = json.load(f)

code_data = code_data[85:]
# 统计变量
n = 0
Q = len(code_data)
K=1


# 对每个accurate_docstring进行查询并计算相似度
str="accurate_docstring"
for idx, query_item in enumerate(code_data):
    query = query_item[str]
    query_inputs = tokenizer(query, return_tensors="pt", padding=True, truncation=True).to(device)
    query_embedding = encoder_model(**query_inputs).last_hidden_state.mean(dim=1)
    
    similarities = []

    for item in code_data:
        code = item["code"]
        code = preprocess_code(code)
        #code = remove_single_line_comments(code)
        code_inputs = tokenizer(code, return_tensors="pt", padding=True, truncation=True).to(device)
        code_embedding = encoder_model(**code_inputs).last_hidden_state.mean(dim=1)
        
        # 计算余弦相似度
        cosine_sim = torch.nn.functional.cosine_similarity(query_embedding, code_embedding, dim=-1)
        
        similarities.append((cosine_sim.item(), item["code"], item[str]))

    # 根据相似度排序
    similarities.sort(reverse=True, key=lambda x: x[0])

    # 设置successRate@K
    top_K_similarities = similarities[:K]#K
    for sim, code, docstring in top_K_similarities:
        if docstring == query:
            n += 1
            break  # 统计一个就够了，跳出循环

# 计算m/Q
m_over_Q = n / Q
print(f"m/Q: {m_over_Q}")
