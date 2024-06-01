import json
from transformers import RobertaTokenizer, RobertaForSequenceClassification
import torch

# 加载微调后的模型和tokenizer
model_dir = 'dataSet/fine-tuned_graphCodeBERT'  # 请根据实际路径修改
tokenizer = RobertaTokenizer.from_pretrained(model_dir)
model = RobertaForSequenceClassification.from_pretrained(model_dir)

# 将模型移动到CUDA设备（如果可用）
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)

# 读取候选代码片段并保存其索引
def load_candidate_code(file_path):
    with open(file_path, 'r') as file:
        data = json.load(file)
    return [(item['code'], idx) for idx, item in enumerate(data)]

# 加载候选代码片段
candidate_code_snippets = load_candidate_code('dataSet/smartAPP/dataset.json')

# 编写代码搜索函数
def search_code(query, code_snippets, tokenizer, model, max_len=128):
    model.eval()
    
    results = []
    
    # 对每个代码片段进行处理
    for code, idx in code_snippets:
        # 对输入进行编码
        inputs = tokenizer(
            query,
            code,
            truncation=True,
            padding='max_length',
            max_length=max_len,
            return_tensors='pt'
        ).to(device)
        
        # 模型前向传播
        with torch.no_grad():
            outputs = model(**inputs)
            logits = outputs.logits
            probabilities = torch.softmax(logits, dim=-1)
            relevance_score = probabilities[0][1].item()  # 获取相关性得分
        
        results.append((code, relevance_score, idx))
    
    # 根据相关性得分进行排序
    results.sort(key=lambda x: x[1], reverse=True)
    
    # 返回前三个匹配度最高的代码片段
    return results[:3]

# 示例查询
query = "Turn lights off when no motion and presence is detected for a set period of time."

# 进行代码搜索
search_results = search_code(query, candidate_code_snippets, tokenizer, model)

# 打印搜索结果
for i, (code, score, idx) in enumerate(search_results, start=1):
    print(f"Top {i} Relevance Score: {score:.4f}\nCode (Line {4*idx+4}):\n{code}\n")
