import os
import json
import torch
import graphviz
from antlr4 import *
from GroovyLexer import GroovyLexer
from GroovyParser import GroovyParser
from GroovyParserVisitor import GroovyParserVisitor

# 解析Groovy代码并生成AST
class ASTGenerator(GroovyParserVisitor):
    def visit(self, ctx):
        node = {
            'type': ctx.__class__.__name__,
            'children': []
        }
        if hasattr(ctx, 'getText'):
            node['text'] = ctx.getText()
        for child in ctx.getChildren():
            node['children'].append(self.visit(child))
        return node

# 读取Groovy代码
code = '''
if (currentHumidity <= notHumidEnough) {
    log.debug "Checking how long the humidity sensor has been reporting <= ${notHumidEnough}"
    if (alreadySentSms) {
        log.debug "Notification already sent within the last ${deltaMinutes} minutes"
    } else {
        log.debug "Humidity Fell Below ${notHumidEnough}:  sending SMS and activating ${mySwitch}"
        send("${humiditySensor1.label} sensed high humidity level of ${evt.value}")
        switch1?.off()
    }
}
'''

# 解析代码
input_stream = InputStream(code)
lexer = GroovyLexer(input_stream)
token_stream = CommonTokenStream(lexer)
parser = GroovyParser(token_stream)
tree = parser.compilationUnit()

# 生成AST
visitor = ASTGenerator()
ast = visitor.visit(tree)

# 将AST转换为字典对象
def to_dict(node):
    if isinstance(node, dict):
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
    
    label = node['type']
    if 'text' in node:
        label += f"\\ntext: {node['text']}"
    
    # 转义特殊字符
    label = label.replace('"', '\\"').replace('\n', '\\n')
    
    dot += f'"{node_id}" [label="{label}"];\n'
    
    if parent:
        dot += f'"{parent}" -> "{node_id}";\n'
    
    for i, child in enumerate(node['children']):
        dot += generate_dot(child, node_id, i)
    
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
    if 'text' in node:
        node_label += f": {node['text']}"
    nodes.append(node_label)
    node_dict[id(node)] = node_id

    if parent is not None:
        edges.append((parent, node_id))

    for child in node['children']:
        extract_nodes_edges(child, node_id)

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
