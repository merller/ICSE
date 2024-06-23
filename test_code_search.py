import json
import torch
from transformers import RobertaTokenizer, T5ForConditionalGeneration, T5EncoderModel

# 加载本地 CodeT5 模型和分词器
model_dir = "dataSet/local_codet5p"
tokenizer = RobertaTokenizer.from_pretrained(model_dir)
model = T5ForConditionalGeneration.from_pretrained(model_dir)
encoder_model = T5EncoderModel.from_pretrained(model_dir)

# 将模型移动到 GPU（如果可用）
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)
encoder_model.to(device)

# 输入查询
query = "When in night security routine."

code="""
nightSecurityRoutine
"""

code1="""
morning garden routine
"""

code2="""
function waterPlants(zone) {
    let moistureLevel = checkSoilMoisture(zone);
    if (moistureLevel < 40) {
        console.log(`Soil moisture is low in ${zone}. Watering plants.`);
        event.waterPlants(zone);
    } else {
        console.log(`Soil moisture is sufficient in ${zone}. No watering needed.`);
    }
}
"""

code3="""
function eveningGreenhouseRoutine() {
    if (event.eveningGreenhouseRoutine) {
        controlTemperature(22);
        controlHumidity(70);
        controlLighting('off');
        waterPlants('zone3');
    }
}
"""

code4="""
function controlTemperature(temp) {
    console.log(`Setting greenhouse temperature to ${temp}°C.`);
    event.controlTemperature(temp);
}
"""

code5="""
function controlHumidity(humidity) {
    console.log(`Setting greenhouse humidity to ${humidity}%.`);
    event.controlHumidity(humidity);
}
"""

code6="""
function controlLighting(state) {
    console.log(`Turning lights ${state} in the greenhouse.`);
    event.controlLighting(state);
}
"""

code7="""
function checkSoilMoisture(zone) {
    let moistureLevel = event.getSoilMoisture(zone);
    console.log(`Soil moisture level in ${zone}: ${moistureLevel}%`);
    return moistureLevel;
}
"""



def get_embeddings(text):
    inputs = tokenizer(text, return_tensors="pt", padding=True, truncation=True).to(device)
    with torch.no_grad():
        outputs = encoder_model(**inputs)
    return outputs.last_hidden_state.mean(dim=1)

query_embedding = get_embeddings(query)
code_embeddings = get_embeddings(code)
code_embeddings1 = get_embeddings(code1)
code_embeddings2 = get_embeddings(code2)
code_embeddings3 = get_embeddings(code3)
code_embeddings4 = get_embeddings(code4)
code_embeddings5 = get_embeddings(code5)
code_embeddings6 = get_embeddings(code6)
code_embeddings7 = get_embeddings(code7)
# 计算余弦相似度
cosine_sim = torch.nn.functional.cosine_similarity(query_embedding, code_embeddings, dim=-1)
cosine_sim1 = torch.nn.functional.cosine_similarity(query_embedding, code_embeddings1, dim=-1)
cosine_sim2 = torch.nn.functional.cosine_similarity(code_embeddings1, code_embeddings, dim=-1)
cosine_sim3 = torch.nn.functional.cosine_similarity(query_embedding, code_embeddings3, dim=-1)
cosine_sim4 = torch.nn.functional.cosine_similarity(query_embedding, code_embeddings4, dim=-1)
cosine_sim5 = torch.nn.functional.cosine_similarity(query_embedding, code_embeddings5, dim=-1)
cosine_sim6 = torch.nn.functional.cosine_similarity(query_embedding, code_embeddings6, dim=-1)
cosine_sim7 = torch.nn.functional.cosine_similarity(query_embedding, code_embeddings7, dim=-1)


print(cosine_sim)
print(cosine_sim1)
print(cosine_sim2)
print(cosine_sim3)
print(cosine_sim4)
print(cosine_sim5)
print(cosine_sim6)
print(cosine_sim7)