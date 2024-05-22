import esprima
import graphviz

# JavaScript代码
code = '''
let Invitetimes=0;
let Rejecttimes=0;
function sendEmail() {
  if(event.Date==Friday){
  event.sendEmail(friend,"How about a drink tonight?");
      Invitetimes++;
  if(event.reply.consist("No")) Rejecttimes--;
  if (Invitetimes==Rejecttimes){
    event.sendEmail(friend,"shame on u");
  }
  }
}
'''

# 解析JavaScript代码并生成AST
ast = esprima.parseScript(code)

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
    
    label = node['type']
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
    
    return dot

dot_content = f'digraph AST {{\n{generate_dot(ast_dict)}}}'

# 使用Graphviz生成和显示AST图形
dot = graphviz.Source(dot_content)
dot.render('ast', format='png', cleanup=False)
dot.view()
