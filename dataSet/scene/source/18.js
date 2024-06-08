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

// 启动自动清洁机器人
function startCleaningRobot() {
    console.log("Starting cleaning robot.");
    event.startCleaningRobot();
}

// 停止自动清洁机器人
function stopCleaningRobot() {
    console.log("Stopping cleaning robot.");
    event.stopCleaningRobot();
}

// 打开空气净化器
function turnOnAirPurifier() {
    console.log("Turning on air purifier.");
    event.turnOnAirPurifier();
}

// 关闭空气净化器
function turnOffAirPurifier() {
    console.log("Turning off air purifier.");
    event.turnOffAirPurifier();
}

// 播放舒缓音乐
function playRelaxingMusic() {
    console.log("Playing relaxing music.");
    event.playMusic("Relaxing Music");
}

// 停止播放音乐
function stopMusic() {
    console.log("Stopping music.");
    event.stopMusic();
}

// 事件处理
eventBus.on('needCleaning', () => {
    startCleaningRobot();
    turnOnAirPurifier();
    playRelaxingMusic();
});

eventBus.on('endCleaning', () => {
    stopCleaningRobot();
    turnOffAirPurifier();
    stopMusic();
    feedPet();
});

// 初始化
function setupHomeCleaningScene() {
    eventBus.emit('needCleaning'); // 模拟摄像头检测到需要打扫
     eventBus.emit('endCleaning'); // 模拟摄像头检测到足够干净
}

// 启动家庭清洁场景
setupHomeCleaningScene();
