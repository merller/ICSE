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

// 播放背景音乐
function playBackgroundMusic(track, duration) {
    console.log(`Playing background music: ${track} for ${duration} minutes`);
    event.playMusic(track);
    setTimeout(() => {
        event.stopMusic(track);
    }, duration * 60 * 1000);
}

// 调整灯光
function adjustLighting(temperature) {
    console.log(`Adjusting lighting to ${temperature}K`);
    event.adjustLighting(temperature);
}

// 启动烤箱预热
function preheatOven(temperature) {
    console.log(`Preheating oven to ${temperature}℃`);
    event.preheatOven(temperature);
}

// 开启空气净化器
function turnOnAirCleaner() {
    console.log("Turning on air cleaner");
    event.turnOnAirCleaner();
}

// 事件处理
eventBus.on('dinnerTime', () => {       //指定的晚餐时间到了
    playBackgroundMusic("Dinner Jazz", 120); // 播放2小时的背景音乐
    adjustLighting(2700); // 调整灯光到柔和的2700K
    preheatOven(180); // 预热烤箱到180℃
    turnOnAirCleaner();
});

// 初始化
function setupDinnerScene() {
    console.log("Setting up dinner scene");
    // 模拟传感器事件触发
     eventBus.emit('dinnerTime'); // 模拟晚餐时间事件
}

// 启动晚餐模式
setupDinnerScene();
