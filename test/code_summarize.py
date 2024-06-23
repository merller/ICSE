import json
import torch
import re
from transformers import T5ForConditionalGeneration, RobertaTokenizer
# 加载本地 CodeT5 模型和分词器
model_dir = "dataSet/local_codet5_base"
model = T5ForConditionalGeneration.from_pretrained(model_dir)
tokenizer = RobertaTokenizer.from_pretrained(model_dir)


text = "def greet(user): print(f'hello <extra_id_0>!')"
input_ids = tokenizer(text, return_tensors="pt").input_ids

# simply generate a single sequence
generated_ids = model.generate(input_ids, max_length=8)
print(tokenizer.decode(generated_ids[0], skip_special_tokens=True))