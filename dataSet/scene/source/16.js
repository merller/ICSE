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

// 调节灯光温度和亮度
function adjustLighting(lightIds, temperature, brightness) {
    lightIds.forEach(id => {
        console.log(`Adjusting light ${id} to ${temperature}K and ${brightness}% brightness`);
        // 替换为实际的灯光控制代码
        event.changelight(id, temperature, brightness);
    });
}

// 播放指定持续时间的音乐
function playMusic(track, duration) {
    console.log(`Playing music track: ${track} for ${duration} seconds`);
    // 替换为实际的音乐播放代码
    event.playMusic(track);
    setTimeout(() => {
        event.stopMusic(track);
    }, duration * 1000);
}

// 停止音乐播放
function stopMusic(track) {
    console.log(`Stopping music track: ${track}`);
    // 替换为实际的音乐停止代码
    event.stopMusic(track);
}

// 控制空调温度
function setAirConditionerTemperature(temperature) {
    console.log(`Setting air conditioner temperature to ${temperature}℃`);
    // 替换为实际的温控代码
    event.setAirConditionerTemperature(temperature);
}

// 启动智能香薰机
function startFragranceMachine() {
    console.log("Starting fragrance machine");
    // 替换为实际的香薰机控制代码
    event.startFragranceMachine();
}

// 停止智能香薰机
function stopFragranceMachine() {
    console.log("Stopping fragrance machine");
    // 替换为实际的香薰机停止代码
    event.stopFragranceMachine();
}

// 控制智能窗帘
function adjustCurtains(action) {
    console.log(`Adjusting curtains to ${action}`);
    // 替换为实际的窗帘控制代码
    event.adjustCurtains(action);
}

// 放松和冥想场景事件处理
eventBus.on('existPressure', () => {
    adjustLighting([1, 2, 3], 2700, 50); // 柔和暖色调和适中的亮度
    playMusic("Relaxing Music", 1800); // 30分钟
    setAirConditionerTemperature(22);
    startFragranceMachine();
    adjustCurtains('close'); // 关闭窗帘
});

eventBus.on('NoPressure', () => {
    stopMusic("Relaxing Music");
    stopFragranceMachine();
    adjustLighting([1, 2, 3], 3500, 100); // 恢复到正常亮度
    adjustCurtains('open'); // 打开窗帘
});

// 初始化冥想场景
function setupMeditationScene() {
    // 模拟传感器事件触发
     eventBus.emit('existPressure'); // 冥想垫压力传感器触发，压力大于100pa
    eventBus.emit('NoPressure'); // 冥想垫压力传感器压力小于10pa
}
setupMeditationScene();


