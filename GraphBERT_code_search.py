import json
from transformers import RobertaTokenizer, RobertaModel
import torch
import torch.nn.functional as F
from sklearn.metrics.pairwise import cosine_similarity

# 加载预训练后的模型和tokenizer
model_dir = 'dataSet/fine-tuned_graphCodeBERT'  # 请根据实际路径修改
tokenizer = RobertaTokenizer.from_pretrained(model_dir)
model = RobertaModel.from_pretrained(model_dir)

# 将模型移动到CUDA设备（如果可用）
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)

# 读取候选代码片段并保存其索引
def load_candidate_code(file_path):
    with open(file_path, 'r') as file:
        data = json.load(file)
    return [(item['code'], idx) for idx, item in enumerate(data)]

# 加载候选代码片段
candidate_code_snippets = load_candidate_code('dataSet/scene/Scene.json')

# 获取嵌入表示
def get_embedding(text, tokenizer, model, max_len=128):
    inputs = tokenizer(
        text,
        truncation=True,
        padding='max_length',
        max_length=max_len,
        return_tensors='pt'
    ).to(device)
    
    with torch.no_grad():
        outputs = model(**inputs)
        embeddings = outputs.last_hidden_state.mean(dim=1)
        
    return embeddings

# 编写代码搜索函数
def search_code(query, code_snippets, tokenizer, model, max_len=128):
    model.eval()
    
    # 获取查询的嵌入表示
    query_embedding = get_embedding(query, tokenizer, model, max_len)
    
    results = []
    
    # 对每个代码片段进行处理
    for code, idx in code_snippets:
        # 获取代码片段的嵌入表示
        code_embedding = get_embedding(code, tokenizer, model, max_len)
        
        # 计算余弦相似度
        similarity = F.cosine_similarity(query_embedding, code_embedding)
        
        results.append((code, similarity.item(), idx))
    
    # 根据相似度进行排序
    results.sort(key=lambda x: x[1], reverse=True)
    
    # 返回前三个匹配度最高的代码片段
    return results[:3]

# 示例查询
query = "When it is Friday, send my friend an email and plus the invite times. If he doesn't reply, plus the reject time and if the reject time equal the invite time, send he another email."

# 进行代码搜索
search_results = search_code(query, candidate_code_snippets, tokenizer, model)

# 打印搜索结果
for i, (code, score, idx) in enumerate(search_results, start=1):
    print(f"Top {i} Cosine Similarity: {score:.4f}\nCode (Line {4*idx+4}):\n{code}\n")
