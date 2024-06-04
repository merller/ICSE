import torch
import numpy as np



# 定义计算余弦相似度的函数
def cosine_similarity(vec1, vec2):
    vec1 = vec1.detach().cpu().numpy()
    vec2 = vec2.detach().cpu().numpy()
    dot_product = np.dot(vec1, vec2.T)
    norm_vec1 = np.linalg.norm(vec1)
    norm_vec2 = np.linalg.norm(vec2)
    similarity = dot_product / (norm_vec1 * norm_vec2)
    return similarity



vector1 = torch.tensor([-0.1528, -0.2369, -0.0510,  0.0059,  0.2013, -0.1217, -0.2543,  0.2476,
         0.0315, -0.0040, -0.0016,  0.2424,  0.1719,  0.1179,  0.2031, -0.6091,
        -0.0193,  0.0647, -0.0053,  0.1121, -0.2556,  0.3153,  0.1572, -0.1670,
        -0.2985,  0.0699, -0.0521, -0.3123,  0.2852,  0.1593,  0.4641,  0.3386,
        -0.0449,  0.3188, -0.1221, -0.0534, -0.0069,  0.1018, -0.3318,  0.2137])
vector2 = torch.tensor([0.2065, -0.2496, -0.0569,  0.0160,  0.2187, -0.1008, -0.3079,  0.2481,
         -0.0231, -0.0362, -0.0051,  0.2193,  0.1731,  0.1060,  0.1554, -0.6071,
         -0.0199,  0.0765, -0.0044,  0.1075,  0.0020, -0.0723,  0.3532, -0.0783,
          0.2033, -0.1903,  0.3290, -0.5055,  0.0728,  0.2482,  0.2090,  0.0889,
         -0.5152, -0.4454, -0.1237,  0.0414,  0.0296, -0.1487,  0.0062,  0.2144])




# 计算余弦相似度
similarity = cosine_similarity(vector1, vector2)

print("余弦相似度：", similarity)
