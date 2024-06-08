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
query = "When the entrance sensor detects someone entering and there is no one in the gym, turn on the lights, activate the smart sockets for the gym equipment, set the fan to 1000 rpm, and broadcast ‘Welcome’. Increase the people counter. When the exit sensor detects someone leaving and there is only one person in the gym, turn off the lights and deactivate the smart sockets for the gym equipment, and broadcast ‘Have a good day’. Decrease the people counter. Turn on the air purifier."
code="""
function startWatering(){
    console.log("Soil is dry. Starting watering system.");
    event.startWatering();
}

function stopWatering(){
    console.log("Soil is moist. Stopping watering system.");
    event.stopWatering();
}
function environmentalMonitoring() {
    setInterval(() => {
        const lightIntensity = getLightIntensity();
        const temperature = getTemperature();
        const humidity = getHumidity();
        console.log(`Light intensity: ${lightIntensity} Lux, Temperature: ${temperature}°C, Humidity: ${humidity}%`);
        event.show("Light intensity: "+lightIntensity +"Lux ,Temperature:"+temperature+"°C, Humidity:"+humidity);
    }, 300000);
}

function playNatureSounds() {
    console.log("Playing nature sounds (birds chirping, water flowing, etc.)");
    event.playMusic("Nature Sounds");
}

function trackPlantGrowth() {
    setInterval(() => {
        var plantGraphics = getPlantGraphics();
        event.sendGraphics(plantGraphics);
    }, 86400000);
}

function adjustThermostat(temperature){
    event.adjustThermostate(temperature);
}

function turnOnFillLights(){
    event.turnOnFillLights();
}

function turnOnLights(){
    event.turnOnLights();
}

eventBus.on("dry", () => {
    startWatering();
});
eventBus.on("moist", () => {
    stopWatering();
});
eventBus.on("night",()=>{
    turnOnFillLights();
})

eventBus.on("doorMovement", () => {
    turnOnLights();
    playNatureSounds();
});

function setupGardenScene() {
    trackPlantGrowth();
    environmentalMonitoring();
    adjustThermostat();
     eventBus.emit("doorMovement");

}

setupGardenScene();
"""

code1="""
function turnOnLight(){
    event.turnOnLight();
}
function turnOffLight(){
    event.turnOffLight();
}
function controlFans(speed) {
    console.log(`Setting fan speed to ${speed}`);
    event.controlFan(speed);
}
function turnOnAirCleaner(){
    event.turnOnAirCleaner();
}
function turnOnSmartOutlets(){
    event.turnOnOutlets();
}
function turnOffSmartOutlets(){
    event.turnOffOutlets();
}
function broadcast(text) {
    event.broadcast(track);
}
var number=0;                       
eventBus.on('EntranceDoorMovement', () => {
    if(number==0)
    {
        turnOnLight();
        turnOnSmartOutlets();
        controlFans(1000);
        number++;
    }
    broadcast("Welcome");
});
eventBus.on('exitDoorMovement', () => {
    if(number==1)
    {
        turnOffLight();
        turnOffSmartOutlets();
        number--;
    }
    broadcast("Have a good day");
});
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
