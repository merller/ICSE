import esprima
import graphviz
import os
import torch
import json

# JavaScript代码
code = '''
let Invitetimes=0;
let Rejecttimes=0;
function sendEmail() {
  if(event.Date==Friday){
    event.sendEmail(friend,"How about a drink tonight?");
    Invitetimes++;
    if(event.replyNo) Rejecttimes--;
    else event.sendEmail(friend,"I am glad you are coming");
    if (Invitetimes==Rejecttimes){
      event.sendEmail(friend,"shame on u");
    }
  }
}
'''

# 解析JavaScript代码并生成AST
ast = esprima.parseScript(code, {'range': True, 'loc': True})

# 将Script对象转换为字典对象
def to_dict(node):
    if hasattr(node, 'toDict'):
        return node.toDict()
    elif isinstance(node, dict):
        return {k: to_dict(v) for k, v in node.items()}
    elif isinstance(node, list):
        return [to_dict(item) for item in node]
    else:
        return node

ast_dict = to_dict(ast)

# 生成Graphviz DOT文件内容
def generate_dot(node, parent=None, index=0):
    dot = ""
    node_id = f"{parent}_{index}" if parent else "root"
    
    # 将节点类型和关键信息作为标签
    if 'type' in node:
        label = node['type']
        if 'name' in node:
            label += f"\\nname: {node['name']}"
        if 'value' in node:
            label += f"\\nvalue: {node['value']}"
        if 'operator' in node:
            label += f"\\noperator: {node['operator']}"
        if 'raw' in node:
            label += f"\\nraw: {node['raw']}"
        
        # 转义特殊字符
        label = label.replace('"', '\\"').replace('\n', '\\n')
        
        dot += f'"{node_id}" [label="{label}"];\n'
        
        if parent:
            dot += f'"{parent}" -> "{node_id}";\n'
        
        for i, (key, value) in enumerate(node.items()):
            if isinstance(value, dict) and value:
                dot += generate_dot(value, node_id, i)
            elif isinstance(value, list):
                for j, item in enumerate(value):
                    if isinstance(item, dict):
                        dot += generate_dot(item, node_id, f"{i}_{j}")
            elif key in {'name', 'value', 'operator', 'raw'}:
                child_id = f"{node_id}_{key}"
                child_label = f"{key}: {value}".replace('"', '\\"').replace('\n', '\\n')
                dot += f'"{child_id}" [label="{child_label}"];\n'
                dot += f'"{node_id}" -> "{child_id}";\n'
    
    return dot

dot_content = f'digraph AST {{\n{generate_dot(ast_dict)}}}'

# 使用Graphviz生成和显示AST图形
dot = graphviz.Source(dot_content)
dot.render('ast', format='png', cleanup=False)
dot.view()

# 提取节点和边信息
nodes = []
edges = []
node_dict = {}

def extract_nodes_edges(node, parent=None):
    if 'type' not in node:
        return
    node_id = len(nodes)
    node_label = node['type']
    if 'name' in node:
        node_label += f": {node['name']}"
    elif 'value' in node:
        node_label += f": {node['value']}"
    nodes.append(node_label)
    node_dict[id(node)] = node_id

    if parent is not None:
        edges.append((parent, node_id))

    for key, value in node.items():
        if isinstance(value, dict):
            extract_nodes_edges(value, node_id)
        elif isinstance(value, list):
            for item in value:
                if isinstance(item, dict):
                    extract_nodes_edges(item, node_id)

extract_nodes_edges(ast_dict)

# 将节点信息和边信息调整为指定格式
node_features_str_1 = nodes

edge_index_1 = torch.tensor([[edge[0], edge[1]] for edge in edges], dtype=torch.long).t()
edge_attr = torch.tensor([0 if nodes[edge[0]].startswith('If') else 1 for edge in edges], dtype=torch.long)  # 边的类型编码

# 创建存放数据的文件夹
output_dir = 'dataSet/Intermediate_data'
os.makedirs(output_dir, exist_ok=True)

# 将节点信息和边信息写入文件
node_features_path = os.path.join(output_dir, 'node_features_str_1.json')
edge_index_path = os.path.join(output_dir, 'edge_index_1.pt')
edge_attr_path = os.path.join(output_dir, 'edge_attr.pt')

with open(node_features_path, 'w') as f:
    json.dump(node_features_str_1, f, indent=4)

torch.save(edge_index_1, edge_index_path)
torch.save(edge_attr, edge_attr_path)

print("Nodes and edges have been written to the files.")
