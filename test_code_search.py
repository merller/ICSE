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
query = "When start sleep, automatically turn off all lights. Close the curtains. Play 30 minutes of soothing music “Soothing Sounds” to aid sleep. Adjust the air conditioning temperature to 22°C for optimal sleep conditions. Turn on the night light."
code="""
eventBus.on('StartSleep', () => {        //
    turnOffLights();
    closeCurtains();
    playSoothingMusic("Soothing Sounds", 30); // 播放30分钟的舒缓音乐
    setAirConditionerTemperature(22); // 调节空调到22℃
    turnOnNightLight();
});
"""

code1="""
function playSoothingMusic(track, duration) {
    console.log(`Playing soothing music: ${track} for ${duration} minutes`);
    event.playMusic(track);
    setTimeout(() => {
        event.stopMusic(track);
    }, duration * 60 * 1000);
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
