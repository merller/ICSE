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

// 关闭灯光
function turnOffLights() {
    console.log("Turning off lights");
    event.turnOffLights();
}

// 关闭窗帘
function closeCurtains() {
    console.log("Closing curtains");
    event.closeCurtains();
}

// 播放舒缓的音乐
function playSoothingMusic(track, duration) {
    console.log(`Playing soothing music: ${track} for ${duration} minutes`);
    event.playMusic(track);
    setTimeout(() => {
        event.stopMusic(track);
    }, duration * 60 * 1000);
}

// 调节空调温度
function setAirConditionerTemperature(temperature) {
    console.log(`Setting air conditioner temperature to ${temperature}℃`);
    event.setAirConditionerTemperature(temperature);
}

// 开启夜灯
function turnOnNightLight() {
    console.log("Turning on night light");
    event.turnOnNightLight();
}

// 事件处理
eventBus.on('StartSleep', () => {        //
    turnOffLights();
    closeCurtains();
    playSoothingMusic("Soothing Sounds", 30); // 播放30分钟的舒缓音乐
    setAirConditionerTemperature(22); // 调节空调到22℃
    turnOnNightLight();
});

// 初始化
function setupNightMode() {
    console.log("Setting up sleep mode");
    // 模拟传感器事件触发
     eventBus.emit('StartSleep'); // 模拟智能床上压力传感器触发
}

// 启动睡觉场景
setupNightMode();
