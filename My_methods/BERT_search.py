import json
import torch
import re
from transformers import BertTokenizer, BertModel, BertConfig

# 指定本地文件路径
model_dir = 'dataSet/bert-base-uncased/'

# 加载本地的BERT模型和分词器
tokenizer = BertTokenizer.from_pretrained(model_dir)
config = BertConfig.from_pretrained(model_dir)
model = BertModel.from_pretrained(model_dir, config=config)

# 将模型移动到 GPU（如果可用）
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)

# 从 JSON 文件加载代码数据
data_path = "dataSet/scene/Scene.json"
with open(data_path, 'r', encoding='utf-8') as f:
    code_data = json.load(f)

# 只处理第3项到第4项
code_data = code_data[85:]

# 拆分句子函数（根据英文句号拆分）
def split_sentences(docstring):
    sentences = re.split(r'(?<=[.])', docstring)  # 按照句号拆分
    sentences = [s.strip() for s in sentences if s.strip()]
    return sentences#丢弃第一个分句

# 获取嵌入向量函数
def get_embeddings(text):
    inputs = tokenizer(text, return_tensors="pt", padding=True, truncation=True).to(device)
    with torch.no_grad():
        outputs = model(**inputs)
    return outputs.last_hidden_state.mean(dim=1)

# 函数拆分方法，通过函数间的空白行来拆分函数
def remove_single_line_comments(code):
    return re.sub(r'//.*', '', code)

def split_code_by_blank_lines(code):
    code = code.strip()
    functions = re.split(r'\n\s*\n', code)  # 按照空白行分割代码
    # 提取第一行注释作为函数的标识符
    function_identifiers = []
    for function in functions:
        lines = function.split('\n')
        first_comment = None
        for line in lines:
            line = line.strip()
            if line.startswith('//'):
                first_comment = line
                break
        if first_comment:
            function_identifiers.append(first_comment)
    
    return function_identifiers


n = 0
Q = len(code_data)
K = 1
str="accurate_docstring"

# 计算相似度并输出结果
for idx, query_item in enumerate(code_data):
    results = []
    sentences = split_sentences(query_item[str])

    for idx, item in enumerate(code_data):
        if 'accurate_docstring' in item and 'code' in item:
            # 将代码按函数段进行拆分
            code_snippets = split_code_by_blank_lines(item['code'])
            # 获取每段代码的嵌入向量
            #code_snippets = [remove_event_related_code(code) for code in code_snippets]
            code_embeddings = [get_embeddings(code) for code in code_snippets]

            docstring_similarities = []

            for sentence in sentences:
                sentence_embedding = get_embeddings(sentence)
                max_similarity = float('-inf')

                for code_embedding in code_embeddings:
                    similarity = torch.nn.functional.cosine_similarity(sentence_embedding, code_embedding, dim=-1)
                    max_similarity = max(max_similarity, similarity.item())

                docstring_similarities.append(max_similarity)

            # 计算平均相似度
            if docstring_similarities:
                avg_similarity = sum(docstring_similarities) / len(docstring_similarities)
                results.append((avg_similarity, item[str],item['code']))
    results.sort(reverse=True, key=lambda x: x[0])
    # 设置successRate@K
    top_k_similarities = results[:K]
    for sim, docstring,code in top_k_similarities:
        if docstring == query_item[str]:
            n += 1
            break  # 统计一个就够了，跳出循环
   

    

# 计算m/Q
m_over_Q = n / Q
print(f"m/Q: {m_over_Q}")
