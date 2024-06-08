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

// 播放音乐
function playMusic(track, duration) {
    console.log(`Playing music: ${track} for ${duration} seconds`);
    event.playMusic(track);
    setTimeout(() => {
        event.stopMusic(track);
    }, duration * 1000);
}

// 打开窗帘
function openCurtains() {
    console.log("Opening curtains");
    event.openCurtains();
}

// 控制咖啡机
function startCoffeeMaker() {
    console.log("Starting coffee maker");
    event.startCoffeeMaker();
}

// 调整灯光
function adjustLighting(temperature) {
    console.log(`Adjusting lighting to ${temperature}K`);
    event.adjustLighting(temperature);
}

// 开启空气净化器
function turnOnAirCleaner() {
    console.log("Turning on air cleaner");
    event.turnOnAirCleaner();
}

// 事件处理
eventBus.on('AM7:00', () => {             //时间到达7点
    playMusic("Morning Melody", 300); // 播放5分钟的音乐
    openCurtains();
    startCoffeeMaker();
    adjustLighting(3000); // 调整灯光到柔和的3000K
    turnOnAirCleaner();
});

// 初始化
function setupMorningScene() {
    console.log("Setting up morning wake-up scene");
    // 模拟传感器事件触发
     eventBus.emit('morningWakeUp'); // 模拟早晨唤醒事件
}

// 启动早晨唤醒场景
setupMorningScene();
