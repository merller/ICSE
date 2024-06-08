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

// 打开窗帘
function openCurtains() {
    console.log("Opening curtains.");
    event.openCurtains();
}

// 关闭窗帘
function closeCurtains() {
    console.log("Closing curtains.");
    event.closeCurtains();
}

// 打开灯光
function turnOnLights() {
    console.log("Turning on lights.");
    event.turnOnLights();
}

// 关闭灯光
function turnOffLights() {
    console.log("Turning off lights.");
    event.turnOffLights();
}

// 播放浪漫音乐
function playRomanticMusic() {
    console.log("Playing romantic music.");
    event.playMusic("Romantic Playlist");
}

// 停止播放音乐
function stopMusic() {
    console.log("Stopping music.");
    event.stopMusic();
}

// 设置温度
function setTemperature(temp) {
    console.log(`Setting temperature to ${temp}°C.`);
    event.setTemperature(temp);
}

// 准备晚餐
function prepareDinner() {
    console.log("Preparing dinner.");
    event.prepareDinner();
}

// 事件处理
eventBus.on('startDateNight', () => {
    openCurtains();
    turnOnLights();
    playRomanticMusic();
    setTemperature(22);
    prepareDinner();
});

eventBus.on('endDateNight', () => {
    closeCurtains();
    turnOffLights();
    stopMusic();
});

// 初始化
function setupDateNightScene() {
    eventBus.emit('startDateNight'); // 模拟约会夜开始
    setTimeout(() => eventBus.emit('endDateNight'), 10800000); // 模拟约会夜结束 (3小时后)
}

// 启动约会夜场景
setupDateNightScene();
