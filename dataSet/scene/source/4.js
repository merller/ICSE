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
function turnOnLight(){
    event.turnOnLight();
}
//关闭灯光
function turnOffLight(){
    event.turnOffLight();
}
//控制风扇
function controlFans(speed) {
    console.log(`Setting fan speed to ${speed}`);
    event.controlFan(speed);
}
//打开空气净化器
function turnOnAirCleaner(){
    event.turnOnAirCleaner();
}
//打开健身器材电源智能插座
function turnOnSmartOutlets(){
    event.turnOnOutlets();
}
//打开健身器材电源智能插座
function turnOffSmartOutlets(){
    event.turnOffOutlets();
}
// 播放指定持续时间的音乐
function broadcast(text) {
    event.broadcast(track);
}
// 事件处理
var number=0;                       //健身馆人数
eventBus.on('EntranceDoorMovement', () => {
    if(number==0)
    {
        turnOnLight();
        turnOnSmartOutlets();
        controlFans(1000);
        number++;
    }
    broadcast("Welcome");
});
eventBus.on('exitDoorMovement', () => {
    if(number==1)
    {
        turnOffLight();
        turnOffSmartOutlets();
        number--;
    }
    broadcast("Have a good day");
});
// 初始化
function setupWeddingScene() {
    turnOnAirCleaner()
    // 模拟传感器事件触发
    eventBus.emit('EntranceDoorMovement');               //模拟入口传感器触发
    eventBus.emit('exitDoorMovement');                   //模拟出口传感器触发
}

// 启动婚礼场景
setupWeddingScene();