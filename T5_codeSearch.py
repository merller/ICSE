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

# 输入查询和代码片段
query = "when light is on and door is open, turn on the TV and close the door"
code_snippets = [
    "def max_value(arr): return max(arr)",
    "def backHome: if(event.lightON){event.OnTV}",
    "def backHome: if(event.lightON&&event.doorOpen){event.CloseDoor;event.OnTV} else if(event.doorOpen){event.closeDoor}"
]

# 预处理输入
query_inputs = tokenizer(query, return_tensors="pt").to(device)
code_inputs = tokenizer(code_snippets, padding=True, return_tensors="pt").to(device)

# 计算查询和代码片段的嵌入向量
with torch.no_grad():
    query_embedding = encoder_model(**query_inputs).last_hidden_state.mean(dim=1)
    code_embeddings = encoder_model(**code_inputs).last_hidden_state.mean(dim=1)

# 计算余弦相似度
cosine_sim = torch.nn.functional.cosine_similarity(query_embedding, code_embeddings, dim=-1)

# 打印结果
print(f"Query: {query}\n")
for idx, (code_snippet, score) in enumerate(zip(code_snippets, cosine_sim)):
    print(f"Code snippet {idx + 1}: {code_snippet}")
    print(f"Similarity score: {score.item()}\n")
