# 定义函数来读取并分析JavaScript代码文件
def analyze_js_code(file_path):
    with open(file_path, 'r') as file:
        lines = file.readlines()
        
    # 保存函数定义和它们的依赖
    function_defs = {}
    current_function = None
    
    for line in lines:
        stripped_line = line.strip()
        
        # 发现函数定义
        if stripped_line.startswith("function"):
            function_name = stripped_line.split()[1].split('(')[0]
            current_function = function_name
            function_defs[current_function] = {"definition": [], "calls": set()}
        
        if current_function:
            function_defs[current_function]["definition"].append(line)
        
        # 发现函数调用
        if current_function and '(' in stripped_line and not stripped_line.startswith("function"):
            for func in function_defs.keys():
                if func + '(' in stripped_line:
                    function_defs[current_function]["calls"].add(func)
    
    return function_defs

# 基于调用关系切割代码
def partition_code(function_defs):
    partitions = []
    
    def find_all_related(func_name, seen):
        if func_name in seen:
            return
        seen.add(func_name)
        for called_func in function_defs[func_name]["calls"]:
            find_all_related(called_func, seen)
    
    for func in function_defs.keys():
        seen = set()
        find_all_related(func, seen)
        partitions.append(seen)
    
    # 排除重复的集合
    unique_partitions = []
    for partition in partitions:
        if partition not in unique_partitions:
            unique_partitions.append(partition)
    
    return unique_partitions

# 保存切割后的代码到文件
def save_partitions(function_defs, partitions, output_dir):
    for i, partition in enumerate(partitions):
        file_path = f"{output_dir}/part_{i+1}.js"
        with open(file_path, 'w') as file:
            for func in partition:
                for line in function_defs[func]["definition"]:
                    file.write(line)
                file.write("\n")

# 设置路径
js_file_path = 'dataSet/scene/source/office HVAC.js'  # 输入的JavaScript文件路径
output_dir = 'results/slice'  # 输出目录

import os
if not os.path.exists(output_dir):
    os.makedirs(output_dir)

# 分析代码，切割并保存
function_defs = analyze_js_code(js_file_path)
partitions = partition_code(function_defs)
save_partitions(function_defs, partitions, output_dir)
