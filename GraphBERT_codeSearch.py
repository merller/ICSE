import json
from transformers import RobertaTokenizer, RobertaForSequenceClassification, Trainer, TrainingArguments, DataCollatorWithPadding
from torch.utils.data import Dataset, DataLoader
import torch

# 检查CUDA设备
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print(f"Using device: {device}")

# 自定义数据集类
class CodeSearchDataset(Dataset):
    def __init__(self, data, tokenizer, max_len):
        self.data = data
        self.tokenizer = tokenizer
        self.max_len = max_len

    def __len__(self):
        return len(self.data)

    def __getitem__(self, idx):
        item = self.data[idx]
        code = item['code']
        docstring = item['docstring']

        encoding = self.tokenizer(
            code,
            docstring,
            truncation=True,
            padding='max_length',
            max_length=self.max_len,
            return_tensors='pt'
        )

        inputs = {
            'input_ids': encoding['input_ids'].flatten(),
            'attention_mask': encoding['attention_mask'].flatten(),
            'labels': torch.tensor(1)  # 这里标签可以根据实际任务需要修改
        }

        return inputs

# 读取数据集并只获取前100个项
def load_data(file_path, num_entries=100):
    with open(file_path, 'r') as file:
        data = json.load(file)
    return data[:num_entries]

# 加载数据集
data = load_data('dataSet/scene/Scene.json', num_entries=100)

# 初始化Tokenizer
model_dir='dataSet/local_graphcodebert_base'
tokenizer = RobertaTokenizer.from_pretrained(model_dir)

# 创建数据集实例
dataset = CodeSearchDataset(data, tokenizer, max_len=128)

# 创建数据加载器
data_loader = DataLoader(dataset, batch_size=4, shuffle=True)

# 初始化模型并移动到GPU
model = RobertaForSequenceClassification.from_pretrained(model_dir, num_labels=2).to(device)

# 设置训练参数
training_args = TrainingArguments(
    output_dir='./results',
    num_train_epochs=5,  # 调整epoch数量
    per_device_train_batch_size=4,
    per_device_eval_batch_size=4,
    warmup_steps=500,
    weight_decay=0.01,
    logging_dir='./logs',
    logging_steps=10,
)

# 自定义Trainer以使用CUDA设备
class CustomTrainer(Trainer):
    def compute_loss(self, model, inputs, return_outputs=False):
        inputs = {k: v.to(device) for k, v in inputs.items()}
        outputs = model(**inputs)
        loss = outputs.loss
        return (loss, outputs) if return_outputs else loss

# 创建Trainer实例
trainer = CustomTrainer(
    model=model,
    args=training_args,
    train_dataset=dataset,
    eval_dataset=dataset,
    data_collator=DataCollatorWithPadding(tokenizer)
)

# 开始训练
trainer.train()
