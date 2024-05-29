import json
import re
import os

# 读取JSON文件内容
input_file = os.path.join('dataSet/smartAPP', 'dataset.json')
with open(input_file, 'r', encoding='utf-8') as file:
    data = json.load(file)

# 定义函数来处理代码字符串
def remove_until_def_ins(code):
    # 使用正则表达式查找第一个def ins及其前面的所有内容
    pattern = re.compile(r'.*?(?=def\s+ins)', re.DOTALL)
    # 替换匹配到的内容为空字符串
    cleaned_code = re.sub(pattern, '', code, count=1)
    return cleaned_code

# 处理每个对象中的代码字符串
for item in data:
    if 'code' in item:
        item['code'] = remove_until_def_ins(item['code'])

# 将处理后的数据写回原始JSON文件
with open(input_file, 'w', encoding='utf-8') as file:
    json.dump(data, file, indent=4)

print("处理完成，结果已写入 dataset.json 文件。")
