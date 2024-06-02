import torch
import json
import os

# 设置文件路径
output_dir = 'dataSet/Intermediate_data'
node_features_path = os.path.join(output_dir, 'node_features_str_1.json')
edge_index_path = os.path.join(output_dir, 'edge_index_1.pt')
edge_attr_path = os.path.join(output_dir, 'edge_attr.pt')

# 读取节点信息
with open(node_features_path, 'r') as f:
    node_features_str_1 = json.load(f)

# 读取边信息
edge_index_1 = torch.load(edge_index_path)
#edge_attr = torch.load(edge_attr_path)

# 输出到控制台
print("Node Features:")
print(node_features_str_1)


print("\nEdge Index:")
print(edge_index_1)

