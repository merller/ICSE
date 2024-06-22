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
function activateAutonomousDriving() {
    console.log("Activating autonomous driving mode.");
    event.activateAutonomousDriving();
}
function activateParkingAssistance() {
    console.log("Activating parking assistance.");
    event.activateParkingAssistance();
}
function playTrafficReport() {
    console.log("Playing traffic report.");
    event.playTrafficReport();
}
function updateWeather() {
    console.log("Updating weather information.");
    event.updateWeather();
}
function adjustCarTemperature(temp) {
    console.log(`Setting car temperature to ${temp}°C.`);
    event.adjustCarAcTemperature(temp);
}

function startJourney()
{
    if(event.startJourney){
        activateAutonomousDriving();
        playTrafficReport();
        updateWeather();
        adjustCarTemperature(22);
    }
}


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
