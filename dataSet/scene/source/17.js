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

// 播放派对音乐
function playPartyMusic() {
    console.log("Playing party music.");
    event.playMusic("Party Playlist");
}

// 停止派对音乐
function stopPartyMusic() {
    console.log("Stopping party music.");
    event.stopMusic();
}

// 控制灯光
function controlPartyLights(mode) {
    console.log(`Setting lights to ${mode} mode.`);
    event.setLights(mode);
}

// 控制烟雾机
function controlFogMachine(action) {
    console.log(`${action} fog machine.`);
    if (action === "Starting") {
        event.startFogMachine();
    } else {
        event.stopFogMachine();
    }
}

// 控制激光灯
function controlLaserLights(action) {
    console.log(`${action} laser lights.`);
    if (action === "Starting") {
        event.startLaserLights();
    } else {
        event.stopLaserLights();
    }
}
let number=0;
// 事件处理
eventBus.on('entranceDoorMovement', () => {
    if(number==0){
        playPartyMusic();
        controlPartyLights("party");
        controlFogMachine("Starting");
        controlLaserLights("Starting");
        number++;
    }

});

eventBus.on('exitDoorMovement', () => {
    if(number==1){
        stopPartyMusic();
        controlPartyLights("normal");
        controlFogMachine("Stopping");
        controlLaserLights("Stopping");
        number--;
    }

});

// 初始化
function setupPartyScene() {
    eventBus.emit('entranceDoorMovement'); // 模拟派对开始
    eventBus.emit('exitDoorMovement'); // 模拟4小时后派对结束
}

// 启动派对场景
setupPartyScene();
