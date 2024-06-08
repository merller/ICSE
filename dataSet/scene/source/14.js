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

// 开启阅读灯
function turnOnReadingLight() {
    console.log("Turning on reading light.");
    event.turnOnReadingLight();
}

// 关闭阅读灯
function turnOffReadingLight() {
    console.log("Turning off reading light.");
    event.turnOffReadingLight();
}

// 播放轻音乐
function playSoftMusic() {
    console.log("Playing soft background music.");
    event.playMusic("Soft Music");
}

// 停止播放轻音乐
function stopSoftMusic() {
    console.log("Stopping soft background music.");
    event.stopMusic();
}

// 调整环境温度
function adjustTemperature(temp) {
    console.log(`Adjusting room temperature to ${temp}°C`);
    event.adjustTemperature(temp);
}

// 环境监测
function monitorEnvironment() {
    setInterval(() => {
        const lightIntensity = getLightIntensity();
        const temperature = getTemperature();
        console.log(`Light intensity: ${lightIntensity} Lux, Temperature: ${temperature}°C`);
        event.show(`Light intensity: ${lightIntensity} Lux, Temperature: ${temperature}°C`);
    }, 300000); // 每隔5分钟检测一次环境参数
}

// 事件处理
eventBus.on('startReading', () => {
    turnOnReadingLight();
    playSoftMusic();
    adjustTemperature(22); // 设置舒适的阅读温度
    monitorEnvironment();
});

eventBus.on('endReading', () => {
    turnOffReadingLight();
    stopSoftMusic();
});

// 初始化
function setupReadingScene() {
    eventBus.emit('startReading'); // 模拟开始阅读
    setTimeout(() => eventBus.emit('endReading'), 7200000); // 模拟2小时后结束阅读
}

// 启动阅读场景
setupReadingScene();
