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

// 自动喂食器
function automaticFeeder() {
    console.log("Activating automatic feeder.");
    event.feedPet();
}

// 自动喂水
function automaticWatering() {
    console.log("Activating automatic watering.");
    event.waterPet();
}

// 活动监测
function activityMonitoring() {
    setInterval(() => {
        const activityLevel = getActivityLevel();
        event.sendmessage(`Pet activity level: ${activityLevel}`);
        if (activityLevel < 3) {
            console.log("Pet needs more activity.");
        }
    }, 60000); // 每隔1分钟检测一次运动水平
}

// 环境调节
function adjustEnvironment() {
    const temperature = getTemperature();
    const humidity = getHumidity();
    console.log(`Temperature: ${temperature}°C, Humidity: ${humidity}%`);
    if (temperature > 25) {
        console.log("Turning on air conditioning.");
        event.turnOnAirConditioning();
    }
    if (humidity < 40) {
        console.log("Turning on humidifier.");
        event.turnOnHumidifier();
    }
}

// 远程互动
function remoteInteraction() {
    console.log("Remote interaction activated.");
    event.activateRemoteControl();
}

// 事件处理
eventBus.on('startPetCare', () => {
    activityMonitoring();
    adjustEnvironment();
});
eventBus.on('remoteInteraction',()=>{
    remoteInteraction();
});
eventBus.on('NeedFeed',()=>{
    automaticFeeder();
});
eventBus.on('NeedWater',()=>{
    automaticWatering();
});
// 初始化
function setupPetCareScene() {
    // 模拟启动智能宠物照料场景
    eventBus.emit('startPetCare');
    eventBus.emit('NeedFeed');                        //模拟生物传感器检测到宠物饥饿
    eventBus.emit('NeedWater');                      //模拟生物传感器检测到宠物口渴
    eventBus.emit('remoteInteraction');              //模拟主人打开远程互动开关
}

// 启动智能宠物照料场景
setupPetCareScene();
