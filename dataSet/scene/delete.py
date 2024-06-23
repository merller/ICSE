import json

def process_docstring(docstring):
    # 按句号分割
    sentences = docstring.split('.')
    processed_sentences = []
    
    for sentence in sentences:
        # 跳过空句子
        if not sentence.strip():
            continue
        
        # 如果句子包含冒号，删除冒号之前的部分
        if ':' in sentence:
            sentence = sentence.split(':', 1)[-1]
        
        processed_sentences.append(sentence.strip())
    
    # 将处理过的句子重新连接成字符串
    return '. '.join(processed_sentences) + '.'

def clean_docstrings(data):
    for item in data:
        if "accurate_docstring" in item:
            item["accurate_docstring"] = process_docstring(item["accurate_docstring"])
    return data

# 从本地文件读取 JSON 数据
input_file_path = 'dataSet/scene/Scene.json'

with open(input_file_path, 'r', encoding='utf-8') as file:
    data = json.load(file)

# 处理 JSON 数据
cleaned_data = clean_docstrings(data)

# 将处理后的数据保存回本地文件
with open(input_file_path, 'w', encoding='utf-8') as file:
    json.dump(cleaned_data, file, indent=4, ensure_ascii=False)

print(f"处理后的数据已保存到 {input_file_path}")
