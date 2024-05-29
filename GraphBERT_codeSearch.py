import json
import torch
from torch.utils.data import Dataset, DataLoader
from transformers import RobertaTokenizer, RobertaForSequenceClassification, Trainer, TrainingArguments

def load_dataset(path):
    with open(path, 'r') as f:
        return json.load(f)

dataset = load_dataset('dataSet/dataset.json')


class CodeSearchDataset(Dataset):
    def __init__(self, tokenizer, dataset, max_length=128):
        self.tokenizer = tokenizer
        self.dataset = dataset
        self.max_length = max_length

    def __len__(self):
        return len(self.dataset)

    def __getitem__(self, idx):
        item = self.dataset[idx]
        encoding = self.tokenizer(
            item['description'],
            item['code'],
            padding='max_length',
            truncation=True,
            max_length=self.max_length,
            return_tensors='pt'
        )
        # Flatten tensors
        encoding = {key: val.squeeze() for key, val in encoding.items()}
        encoding['labels'] = torch.tensor(1)  # Dummy label, required for the Trainer
        return encoding

# 加载本地 GraphCodeBERT 模型和分词器
model_dir = "dataSet/local_graphcodebert_base"
tokenizer = RobertaTokenizer.from_pretrained(model_dir)
model = RobertaForSequenceClassification.from_pretrained(model_dir, num_labels=2)  # Assuming binary classification

# 创建数据集
train_dataset = CodeSearchDataset(tokenizer, dataset)

# 定义训练参数
training_args = TrainingArguments(
    output_dir='./results',
    num_train_epochs=3,
    per_device_train_batch_size=8,
    per_device_eval_batch_size=8,
    warmup_steps=500,
    weight_decay=0.01,
    logging_dir='./logs',
    logging_steps=10,
    evaluation_strategy="epoch"
)

# 创建Trainer
trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=train_dataset,
    eval_dataset=train_dataset,  # In a real scenario, you should have a separate evaluation dataset
)

# 训练模型
trainer.train()

# 将模型移动到 GPU（如果可用）
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)

# 输入查询和代码片段
query = "find the maximum value in an array"
code_snippets = [
    "def max_value(arr): return max(arr)",
    "def find_maximum(arr): return max(arr)",
    "def sum_array(arr): return sum(arr)"
]

# 预处理输入
query_inputs = tokenizer(query, return_tensors="pt").to(device)
code_inputs = tokenizer(code_snippets, padding=True, return_tensors="pt").to(device)

# 计算查询和代码片段的嵌入向量
with torch.no_grad():
    query_embedding = model.get_encoder()(**query_inputs).last_hidden_state.mean(dim=1)
    code_embeddings = model.get_encoder()(**code_inputs).last_hidden_state.mean(dim=1)

# 计算余弦相似度
cosine_sim = torch.nn.functional.cosine_similarity(query_embedding, code_embeddings, dim=-1)

# 打印结果
print(f"Query: {query}\n")
for idx, (code_snippet, score) in enumerate(zip(code_snippets, cosine_sim)):
    print(f"Code snippet {idx + 1}: {code_snippet}")
    print(f"Similarity score: {score.item()}\n")
