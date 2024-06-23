import networkx as nx
import re

def analyze_js_code(code_string):
    lines = code_string.split('\n')
    
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

def remove_comments(code_lines):
    # 去除行注释
    comment_pattern = re.compile(r'//.*')
    cleaned_lines = [comment_pattern.sub('', line).rstrip() for line in code_lines]
    # 去除空行
    cleaned_lines = [line for line in cleaned_lines if line.strip()]
    return cleaned_lines

def generate_subgraphs(G, function_defs):
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
            code_segments.append(remove_comments(code_segment))
    
    return code_segments

def draw_call_graph_and_generate_subgraphs(function_defs):
    G = nx.DiGraph()
    
    # 添加节点和边
    for func, details in function_defs.items():
        G.add_node(func)
        for called_func in details["calls"]:
            G.add_edge(func, called_func)
    
    # 生成子图并返回包含代码的数组
    code_segments = generate_subgraphs(G, function_defs)
    
    return code_segments

# 主函数，输入为代码字符串，输出为包含代码部分的数组
def analyze_and_generate_subgraphs(code_string):
    # 分析代码
    function_defs = analyze_js_code(code_string)
    
    # 生成子图并返回包含代码的数组
    code_segments = draw_call_graph_and_generate_subgraphs(function_defs)
    
    formatted_segments = []
    for segment in code_segments:
        formatted_code = "\n".join(segment)
        formatted_segments.append(formatted_code)
    return formatted_segments

def insert_blank_lines(code_segments):
    updated_segments = []
    for segment in code_segments:
        updated_segment = []
        for line in segment:
            updated_segment.append(line)
            if line.strip().startswith("function"):
                updated_segment.append("")  # 添加空白行
        updated_segments.append(updated_segment)
    return updated_segments
# 示例代码字符串
code_string = "// Function to adjust office lighting based on occupancy\nfunction adjustOfficeLighting(occupancy, brightness) {\n    if (occupancy > 0) {\n        console.log(`Office occupied. Setting lights to ${brightness}%.`);\n        event.setOfficeLighting('on', brightness);\n    } else {\n        console.log(\"Office empty. Turning lights off.\");\n        event.setOfficeLighting('off', 0);\n    }\n}\n\n// Function to set HVAC temperature based on time of day\nfunction setHVACTemperature(time, temp) {\n    console.log(`Setting HVAC temperature to ${temp}°C at ${time}.`);\n    event.setHVACTemperature(temp);\n}\n\n// Function to check room occupancy\nfunction checkRoomOccupancy() {\n    let occupancy = event.getRoomOccupancy();\n    console.log(`Room occupancy: ${occupancy}`);\n    return occupancy;\n}\n\n// Function to manage energy usage based on room occupancy and time of day\nfunction manageEnergyUsage() {\n    let occupancy = checkRoomOccupancy();\n    let time = new Date().toTimeString().split(' ')[0];\n    let brightness = occupancy > 0 ? 70 : 0;\n    adjustOfficeLighting(occupancy, brightness);\n    setHVACTemperature(time, time < '12:00' ? 22 : 24);\n}\n\n// Morning routine to prepare the office for the day\nfunction morningOfficeRoutine() {\n    if (event.morningOfficeRoutine) {\n        manageEnergyUsage();\n    }\n}\n\n// Afternoon routine to optimize energy usage and comfort\nfunction afternoonOfficeRoutine() {\n    if (event.afternoonOfficeRoutine) {\n        manageEnergyUsage();\n    }\n}\n\n// Evening routine to shut down non-essential systems and save energy\nfunction eveningOfficeRoutine() {\n    if (event.eveningOfficeRoutine) {\n        adjustOfficeLighting(0, 0); // Assume office is empty\n        setHVACTemperature('18:00', 20);\n        event.shutDownNonEssentialSystems();\n    }\n}"

# 调用主函数并打印结果
code_segments = analyze_and_generate_subgraphs(code_string)
#code_segments = insert_blank_lines(code_segments)
for idx, formatted_code in enumerate(code_segments):
    print(f"Subgraph {idx+1}:\n{formatted_code}\n")

