import esprima
import graphviz

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

    def traverse(node, parent):
        nonlocal current
        if isinstance(node, dict):
            if node['type'] == 'FunctionDeclaration':
                func_node = CFGNode(f"Function: {node['id']['name']}")
                parent.add_edge(func_node)
                current = func_node
                for child in node['body']['body']:
                    traverse(child, current)
                current.add_edge(exit)
            elif node['type'] == 'IfStatement':
                if_node = CFGNode("If")
                parent.add_edge(if_node)
                current = if_node
                traverse(node['consequent'], current)
                if 'alternate' in node and node['alternate']:
                    traverse(node['alternate'], current)
            elif node['type'] == 'ExpressionStatement':
                expr_node = CFGNode("Expression")
                parent.add_edge(expr_node)
                current = expr_node
            else:
                for key, value in node.items():
                    traverse(value, parent)
        elif isinstance(node, list):
            for item in node:
                traverse(item, parent)

    traverse(ast, current)
    return entry, exit

entry, exit = generate_cfg(ast)

# 使用Graphviz绘制CFG
def draw_cfg(entry):
    dot = graphviz.Digraph(comment='Control Flow Graph')
    nodes = {}

    def add_node(node):
        if node not in nodes:
            nodes[node] = f"node{len(nodes)}"
            dot.node(nodes[node], node.label)
            for edge in node.edges:
                add_node(edge)
                dot.edge(nodes[node], nodes[edge])

    add_node(entry)
    return dot

cfg = draw_cfg(entry)
cfg.render('cfg', format='png', cleanup=False)
cfg.view()
