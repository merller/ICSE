import json
import torch
from transformers import RobertaTokenizer, T5ForConditionalGeneration, T5EncoderModel

# 加载本地 CodeT5 模型和分词器
model_dir = "dataSet/local_codet5_base"
tokenizer = RobertaTokenizer.from_pretrained(model_dir)
model = T5ForConditionalGeneration.from_pretrained(model_dir)
encoder_model = T5EncoderModel.from_pretrained(model_dir)

# 将模型移动到 GPU（如果可用）
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)
encoder_model.to(device)

# 输入查询
query = "Start Date Night:Open the curtains to create an open atmosphere.Turn on the lights and adjust them to a soft illumination.Play romantic music to set a romantic mood.Set the indoor temperature to a comfortable 22°C.Prepare dinner and ensure everything is ready.End Date Night:After 3 hours, automatically close the curtains.Turn off the lights to create a quiet nighttime atmosphere.Stop playing the music."
code="""
function setTemperature(temp) {
    console.log(`Setting temperature to ${temp}°C.`);
    event.setTemperature(temp);
}
"""

code1="""
function openCurtains() {
    console.log("Opening curtains.");
    event.openCurtains();
}
function closeCurtains() {
    console.log("Closing curtains.");
    event.closeCurtains();
}
function turnOnLights() {
    console.log("Turning on lights.");
    event.turnOnLights();
}
function turnOffLights() {
    console.log("Turning off lights.");
    event.turnOffLights();
}
function playRomanticMusic() {
    console.log("Playing romantic music.");
    event.playMusic("Romantic Playlist");
}
function stopMusic() {
    console.log("Stopping music.");
    event.stopMusic();
}
function setTemperature(temp) {
    console.log(`Setting temperature to ${temp}°C.`);
    event.setTemperature(temp);
}
"""


#分词
query_inputs = tokenizer(query, return_tensors="pt").to(device)
code_inputs = tokenizer(code, padding=True, truncation=True, return_tensors="pt").to(device)
code_inputs1 = tokenizer(code1, padding=True, truncation=True, return_tensors="pt").to(device)



query_embedding = encoder_model(**query_inputs)
code_embeddings = encoder_model(**code_inputs)
code_embeddings1 = encoder_model(**code_inputs1)


print(query_embedding.last_hidden_state.mean(dim=1).shape)
print(code_embeddings.last_hidden_state.mean(dim=1).shape)

# 计算余弦相似度
cosine_sim = torch.nn.functional.cosine_similarity(query_embedding.last_hidden_state.mean(dim=1), code_embeddings.last_hidden_state.mean(dim=1), dim=-1)
cosine_sim1 = torch.nn.functional.cosine_similarity(query_embedding.last_hidden_state.mean(dim=1), code_embeddings1.last_hidden_state.mean(dim=1), dim=-1)


print(cosine_sim)
print(cosine_sim1)
