class EventBus {
    constructor() {
        this.listeners = {};
    }

    on(event, listener) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(listener);
    }

    emit(event, data) {
        if (this.listeners[event]) {
            this.listeners[event].forEach(listener => listener(data));
        }
    }
}

// 创建事件总线实例
const eventBus = new EventBus();

//开启浇水
function startWatering(){
    console.log("Soil is dry. Starting watering system.");
    event.startWatering();
}
//停止浇水
function stopWatering(){
    console.log("Soil is moist. Stopping watering system.");
    event.stopWatering();
}
// 环境监测
function environmentalMonitoring() {
    setInterval(() => {
        const lightIntensity = getLightIntensity();
        const temperature = getTemperature();
        const humidity = getHumidity();
        console.log(`Light intensity: ${lightIntensity} Lux, Temperature: ${temperature}°C, Humidity: ${humidity}%`);
        // 根据环境参数调整环境
        event.show('Light intensity: '+lightIntensity +'Lux ,Temperature:'+temperature+'°C, Humidity:'+humidity);  //电子屏显示环境参数
    }, 300000); // 每隔5分钟检测一次环境参数
}

// 播放自然声音
function playNatureSounds() {
    console.log("Playing nature sounds (birds chirping, water flowing, etc.)");
    event.playMusic("Nature Sounds");
}

// 追踪植物生长
function trackPlantGrowth() {
    setInterval(() => {
        var plantGraphics = getPlantGraphics();                  //智能摄像头获得植物图片
        // 如果需要，提供相应的建议或提示
        event.sendGraphics(plantGraphics);                       //发送图片到手机上
    }, 86400000); // 每隔24小时发送植物图像
}
//调节恒温器
function adjustThermostat(temperature){
    event.adjustThermostate(temperature);
}
//开启补光灯
function turnOnFillLights(){
    event.turnOnFillLights();
}
//开灯
function turnOnLights(){
    event.turnOnLights();
}

// 事件处理
eventBus.on('dry', () => {          //湿度传感器感知到土壤过干
    startWatering();
});
eventBus.on('moist', () => {          //湿度传感器感知到土壤过湿
    stopWatering();
});
eventBus.on('night',()=>{                //时间到达晚上
    turnOnFillLights();
})

eventBus.on('doorMovement', () => {          //花园大门移动
    turnOnLights();
    playNatureSounds();
});
// 初始化
function setupGardenScene() {
    trackPlantGrowth();
    environmentalMonitoring();
    adjustThermostat();
    // 模拟启动智能花园场景
     eventBus.emit('doorMovement'); // 模拟花园大门移动

}
// 启动智能花园场景
setupGardenScene();
