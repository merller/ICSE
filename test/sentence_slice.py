import json
import torch
import re
from transformers import RobertaTokenizer, T5EncoderModel

# 加载本地 CodeT5 模型和分词器
model_dir = "dataSet/local_codet5_base"
tokenizer = RobertaTokenizer.from_pretrained(model_dir)
encoder_model = T5EncoderModel.from_pretrained(model_dir)

# 将模型移动到 GPU（如果可用）
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
encoder_model.to(device)

# 从 JSON 文件加载代码数据
data_path = "dataSet/scene/Scene.json"
with open(data_path, 'r', encoding='utf-8') as f:
    code_data = json.load(f)

code_data = code_data[103:105]

# 拆分句子函数（根据英文句号拆分）
def split_sentences(docstring):
    sentences = re.split(r'(?<=[.;])', docstring)  # 按照句号拆分
    sentences = [s.strip() for s in sentences if s.strip()]
    return sentences[:]  # 保留所有句子

code = """
function afternoonGreenhouseRoutine() {
    if (event.afternoonGreenhouseRoutine) {
        controlTemperature(28);
        waterPlants('zone2');
    }
}
"""
query = "In the afternoon, adjustments are made to maintain optimal conditions with the temperature increased to 28°C and additional watering of plants in zone 2 based on soil moisture levels."

# 获取嵌入向量函数
def get_embeddings(text):
    inputs = tokenizer(text, return_tensors="pt", padding=True, truncation=True).to(device)
    with torch.no_grad():
        outputs = encoder_model(**inputs)
    return outputs.last_hidden_state.mean(dim=1)

query_embedding = get_embeddings(query)

# 函数拆分方法，通过函数间的空白行来拆分函数
def split_code_by_blank_lines(code):
    code = code.strip()
    functions = re.split(r'\n\s*\n', code)#有注释
    functions = [f.strip() for f in functions if f.strip()]
    return functions

# 计算相似度并输出结果
results = []
for idx, item in enumerate(code_data):
    sentences = split_sentences(item['accurate_docstring'])
    for idx, item in enumerate(code_data):
        # 将代码按函数段进行拆分
        code_snippets = split_code_by_blank_lines(item['code'])
        # 获取每段代码的嵌入向量
        code_embeddings = [get_embeddings(snippet) for snippet in code_snippets]
        #print(torch.nn.functional.cosine_similarity(get_embeddings(code),code_embeddings[6]))
        for sentence in sentences:
            sentence_embedding = get_embeddings(sentence)
            sentence_similarities = []

            for idx, code_embedding in enumerate(code_embeddings):
                similarity = torch.nn.functional.cosine_similarity(sentence_embedding, code_embedding, dim=-1)
                sentence_similarities.append(similarity.item())

            results.append((sentence, sentence_similarities))

# 输出相似度结果
for sentence, similarities in results:
    print(f"Sentence: {sentence}")
    for idx, similarity in enumerate(similarities):
        print(f"Code Snippet {idx+1}: Similarity: {similarity:.4f}")
    print("---")
