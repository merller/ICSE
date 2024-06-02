import json
import torch
from transformers import RobertaTokenizer, T5ForConditionalGeneration, Trainer, TrainingArguments
from datasets import Dataset

# 检查CUDA设备
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print(f"Using device: {device}")

# 读取JSON数据文件
with open('dataSet/smartAPP/dataset.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# 提取前100项数据
data = data[:100]

# 将数据转换为datasets库支持的格式
dataset = Dataset.from_dict({
    'code': [item['code'] for item in data],
    'docstring': [item['docstring'] for item in data]
})

# 加载预训练的T5模型和分词器
model_name = 'dataSet/local_codet5_base'
tokenizer = RobertaTokenizer.from_pretrained(model_name)
model = T5ForConditionalGeneration.from_pretrained(model_name).to(device)

# 数据预处理函数
def preprocess_function(examples):
    inputs = [f"code: {code}" if isinstance(code, str) else "code: " for code in examples['code']]
    model_inputs = tokenizer(inputs, max_length=512, truncation=True, padding="max_length")

    # 设置模型的目标
    with tokenizer.as_target_tokenizer():
        labels = tokenizer(examples['docstring'], max_length=512, truncation=True, padding="max_length")

    model_inputs['labels'] = labels['input_ids']
    return model_inputs

# 应用预处理函数
tokenized_dataset = dataset.map(preprocess_function, batched=True)

# 定义训练参数
training_args = TrainingArguments(
    output_dir='./results',
    num_train_epochs=50,
    per_device_train_batch_size=4,
    per_device_eval_batch_size=4,
    warmup_steps=500,
    weight_decay=0.01,
    logging_dir='./logs',
    logging_steps=10,
    save_total_limit=2,
)

# 初始化Trainer
trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=tokenized_dataset,
)

# 训练模型
trainer.train()

# 保存微调后的模型
model.save_pretrained('dataSet/fine-tuned-codeT5')
tokenizer.save_pretrained('dataSet/fine-tuned-codeT5')
