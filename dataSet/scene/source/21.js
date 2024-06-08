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

// 自动驾驶模式
function activateAutonomousDriving() {
    console.log("Activating autonomous driving mode.");
    event.activateAutonomousDriving();
}

// 停车辅助
function activateParkingAssistance() {
    console.log("Activating parking assistance.");
    event.activateParkingAssistance();
}

// 播放交通报告
function playTrafficReport() {
    console.log("Playing traffic report.");
    event.playTrafficReport();
}

// 实时天气更新
function updateWeather() {
    console.log("Updating weather information.");
    event.updateWeather();
}

// 调节空调
function adjustCarTemperature(temp) {
    console.log(`Setting car temperature to ${temp}°C.`);
    event.adjustCarTemperature(temp);
}

// 事件处理
eventBus.on('startJourney', () => {
    activateAutonomousDriving();
    playTrafficReport();
    updateWeather();
    adjustCarTemperature(22);
});

eventBus.on('startParking', () => {
    activateParkingAssistance();
});

eventBus.on('endJourney', () => {
    console.log("Journey ended. Turning off autonomous driving mode.");
    event.deactivateAutonomousDriving();
    console.log("Stopping traffic report.");
    event.stopTrafficReport();
});

// 初始化
function setupTransportScene() {
    eventBus.emit('startJourney'); // 模拟行程开始
    setTimeout(() => eventBus.emit('startParking'), 1800000); // 模拟停车
    setTimeout(() => eventBus.emit('endJourney'), 3600000); // 模拟行程结束
}

// 启动交通场景
setupTransportScene();
