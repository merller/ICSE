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
//打开灯光
function turnOnLights(){
   event.turnOnLights();
}
//关闭灯光
function turnOffLights(){
    event.turnOffLights();
}
//打开台灯
function turnOnDeskLamp(){
    event.turnOnDeskLamp()
}
//关闭台灯
function turnOffDeskLamp(){
    event.turnOffDeskLamp()
}
//播放白噪音
function playWhiteNoise(name){
        event.playWhiteNoise(name);
}
//停止播放白噪音
function stopWhiteNoise(name){
    event.stopWhiteNoise();
}
//跟踪学习情况
function trackLearning(){
    setInterval(() => {
        let graphics=getGraphics();
        event.sendMessage(graphics)
    }, 3600000); // 每半小时发送学习情况图片
}
//眼保健操提醒
function healthReminders() {
    setInterval(() => {
        console.log("Time to take a break and stretch.");
        event.sendReminder("Take a break and stretch.");
    }, 3600000); // 每小时提醒一次
}
//事件处理
eventBus.on('StartLearning', () => {
    turnOnLights();
    turnOnDeskLamp();
    playWhiteNoise('rain');
    trackLearning();
    healthReminders();
});
eventBus.on('EndLearning', () => {
    turnOffLights();
    turnOffDeskLamp();
    stopWhiteNoise();

});
// 初始化
function setupLearningScene() {
    eventBus.emit('StartLearning'); // 模拟开启学习
    setTimeout(() => eventBus.emit('EndLearning'), 10800000); // 模拟学习结束
}

// 启动学习场景
setupsetupLearningScene