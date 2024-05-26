import esprima
import os
import torch
import json

# 静态JavaScript代码
code = '''
let a = 10;
let b = 5;
if (a > b) {
    let difference = a - b;
} else {
    let sum = a + b;
}
'''

# 解析JavaScript代码并生成AST
ast = esprima.parseScript(code)

# 定义CFG节点类
class CFGNode:
    def __init__(self, label):
        self.label = label
        self.edges = []

    def add_edge(self, node):
        self.edges.append(node)

    def __repr__(self):
        return f"CFGNode(label={self.label})"

# 遍历AST生成CFG
def generate_cfg(ast):
    entry = CFGNode("Entry")
    exit = CFGNode("Exit")
    current = entry

    nodes = [entry]
    edges = []

    def traverse(node, parent):
        nonlocal current
        if isinstance(node, dict):
            if node['type'] == 'FunctionDeclaration':
                func_node = CFGNode(f"Function: {node['id']['name']}")
                nodes.append(func_node)
                edges.append((parent, func_node))
                current = func_node
                for child in node['body']['body']:
                    traverse(child, current)
                edges.append((current, exit))
            elif node['type'] == 'IfStatement':
                if_node = CFGNode("If")
                nodes.append(if_node)
                edges.append((parent, if_node))
                current = if_node
                traverse(node['consequent'], current)
                if 'alternate' in node and node['alternate']:
                    traverse(node['alternate'], current)
            elif node['type'] == 'ExpressionStatement':
                expr_node = CFGNode("Expression")
                nodes.append(expr_node)
                edges.append((parent, expr_node))
                current = expr_node
            else:
                for key, value in node.items():
                    traverse(value, parent)
        elif isinstance(node, list):
            for item in node:
                traverse(item, parent)

    traverse(ast, current)
    nodes.append(exit)
    return entry, exit, nodes, edges

entry, exit, nodes, edges = generate_cfg(ast)

# 创建存放数据的文件夹
output_dir = 'dataSet/Intermediate_data'
os.makedirs(output_dir, exist_ok=True)

# 将节点信息和边信息调整为指定格式
node_features_str_1 = [node.label for node in nodes]

edge_index_1 = torch.tensor([[nodes.index(edge[0]), nodes.index(edge[1])] for edge in edges], dtype=torch.long).t()
edge_attr = torch.tensor([0 if edge[0].label == 'If' else 1 for edge in edges], dtype=torch.long)  # 边的类型编码

# 将节点信息和边信息写入文件
node_features_path = os.path.join(output_dir, 'node_features_str_1.json')
edge_index_path = os.path.join(output_dir, 'edge_index_1.pt')
edge_attr_path = os.path.join(output_dir, 'edge_attr.pt')

with open(node_features_path, 'w') as f:
    json.dump(node_features_str_1, f, indent=4)

torch.save(edge_index_1, edge_index_path)
torch.save(edge_attr, edge_attr_path)

print("Nodes and edges have been written to the files.")
