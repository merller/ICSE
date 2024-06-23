import networkx as nx
import matplotlib.pyplot as plt
import re
import os

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
        
        # 发现函数调用，排除以 event. 开头的调用
        if current_function and '(' in stripped_line and not stripped_line.startswith("function"):
            # 使用正则表达式查找函数调用
            matches = re.findall(r'(?<!event\.)\b(\w+)\(', stripped_line)
            for match in matches:
                if match in function_defs:
                    function_defs[current_function]["calls"].add(match)
    
    return function_defs

# 从每个节点生成子图并保存，返回包含代码的数组
def generate_and_save_subgraphs(G, function_defs, output_dir):
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
    
    code_segments = []
    
    for node in G.nodes:
        subgraph_nodes = nx.descendants(G, node) | {node}
        subgraph = G.subgraph(subgraph_nodes)
        
        # 仅保存包含两个或更多节点的子图
        if len(subgraph.nodes) > 1:
            # 提取子图中节点对应的代码部分
            code_segment = []
            for subgraph_node in subgraph.nodes:
                code_segment.extend(function_defs[subgraph_node]["definition"])
            code_segments.append(code_segment)
            
            # 保存子图
            plt.figure(figsize=(10, 8))
            pos = nx.spring_layout(subgraph)
            nx.draw(subgraph, pos, with_labels=True, node_size=3000, node_color="skyblue", font_size=10, font_weight="bold", edge_color="gray")
            plt.title(f"Subgraph from node {node}")
            plt.savefig(f"{output_dir}/subgraph_{node}.png")
            plt.close()
    
    return code_segments

# 绘制调用图并生成子图，返回包含代码的数组
def draw_call_graph_and_generate_subgraphs(function_defs, output_dir):
    G = nx.DiGraph()
    
    # 添加节点和边
    for func, details in function_defs.items():
        G.add_node(func)
        for called_func in details["calls"]:
            G.add_edge(func, called_func)
    
    # 绘制调用图
    plt.figure(figsize=(10, 8))
    pos = nx.spring_layout(G)
    nx.draw(G, pos, with_labels=True, node_size=3000, node_color="skyblue", font_size=10, font_weight="bold", edge_color="gray")
    plt.title("Function Call Graph")
    plt.show()
    
    # 生成并保存子图，返回包含代码的数组
    code_segments = generate_and_save_subgraphs(G, function_defs, output_dir)
    
    return code_segments

# 设置路径
js_file_path = 'dataSet/scene/source/office HVAC.js'  # 输入的JavaScript文件路径
output_dir = 'results/slice'  # 输出子图目录

# 分析代码
function_defs = analyze_js_code(js_file_path)

# 绘制调用图并生成子图，返回包含代码的数组
code_segments = draw_call_graph_and_generate_subgraphs(function_defs, output_dir)

# 输出每个子图包含的代码部分
for i, segment in enumerate(code_segments):
    print(f"Code for subgraph {i + 1}:")
    for line in segment:
        print(line, end="")
    print("\n")
