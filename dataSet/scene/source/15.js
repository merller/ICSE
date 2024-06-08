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

// 调节灯光温度
function adjustLighting(lightIds, temperature) {
    lightIds.forEach(id => {
        console.log(`Adjusting light ${id} to ${temperature}K`);
        event.changelight(id, temperature);
    });
}

// 播放指定持续时间的音乐
function playMusic(track, duration) {
    console.log(`Playing music track: ${track} for ${duration} seconds`);
    event.playMusic(track);
    setTimeout(() => {
        event.stopMusic(track);
    }, duration * 1000);
}

// 控制空调温度
function setAirConditionerTemperature(temperature) {
    console.log(`Setting air conditioner temperature to ${temperature}℃`);
    event.setAirConditionerTemperature(temperature);
}

// 智能镜子显示身体数据
function startSmartMirror() {
    console.log("Starting smart mirror with yoga guidance");
    event.showdata();
}

// 启动智能空气净化器
function startAirPurifier() {
    console.log("Starting air purifier");
    event.startAirPurifier();
}

// 健身追踪器监控
function startFitnessTracker() {
    console.log("Starting fitness tracker");
    event.startFitnessTracker();
}

// 瑜伽场景事件处理
eventBus.on('yogaSessionStart', () => {
    adjustLighting([1, 2, 3], 2700); // 柔和暖色调
    playMusic("Yoga Playlist", 3600); // 1小时
    setAirConditionerTemperature(22);
    startSmartMirror();
    startAirPurifier();
    startFitnessTracker();
});
eventBus.on('MirrorExistPerson', () => {
    startSmartMirror();
});
// 初始化瑜伽场景
function setupYogaScene() {
    // 模拟传感器事件触发
    eventBus.emit('yogaSessionStart'); // 模拟瑜伽练习开始事件
    eventBus.emit('MirrorExistPerson'); // 模拟镜子前有人
}

// 启动瑜伽场景
setupYogaScene();
