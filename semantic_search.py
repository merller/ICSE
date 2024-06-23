import re
import torch
from transformers import RobertaTokenizer, T5EncoderModel

def split_camel_case(name):
    # 使用正则表达式拆分驼峰命名法单词
    return re.sub('([a-z])([A-Z])', r'\1 \2', name).split()

def preprocess_code(code):
    # 匹配所有的驼峰命名法单词
    camel_case_words = re.findall(r'[a-zA-Z][a-z]*[A-Z][a-zA-Z]*', code)
    for word in camel_case_words:
        # 拆分驼峰命名法单词
        split_words = split_camel_case(word)
        # 用拆分后的单词替换原始单词
        code = code.replace(word, ' '.join(split_words))
    return code

# 加载本地 CodeT5 模型和分词器
model_dir = "dataSet/local_codet5_base"
tokenizer = RobertaTokenizer.from_pretrained(model_dir)
encoder_model = T5EncoderModel.from_pretrained(model_dir)
# 将模型移动到 GPU（如果可用）
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
encoder_model.to(device)
# 示例源代码
source_code = "// Function to brew coffee\nfunction brewCoffee(type) {\n    console.log(`Brewing ${type} coffee.`);\n    event.brewCoffee(type);\n}\n\n// Function to set a brewing schedule\nfunction setBrewingSchedule(time) {\n    console.log(`Setting brewing schedule to ${time}.`);\n    event.setBrewingSchedule(time);\n}\n\n// Function to check coffee bean level\nfunction checkBeanLevel() {\n    let level = event.getBeanLevel();\n    console.log(`Coffee bean level: ${level}%`);\n    return level;\n}\n\n// Function to refill coffee beans if the level is low\nfunction refillBeans() {\n    if (checkBeanLevel() < 20) {\n        console.log(\"Refilling coffee beans.\");\n        event.refillBeans();\n    } else {\n        console.log(\"Coffee beans are sufficient.\");\n    }\n}\n"

# 预处理源代码
preprocessed_code = preprocess_code(source_code)
print("Preprocessed Code:", preprocessed_code)



