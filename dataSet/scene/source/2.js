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
//开启圣诞灯，每隔1秒闪烁
function controlChristmasLights(){
    while(1){
        turnOnChristmasLights();
        setTimeout(() => {
            event.turnOffChristmasLights();
        }, duration * 1000);
    }

}
//播放圣诞快乐歌
function playMerryChristmas(){
     event.playMusic('Merry Christmas');
}
//打开氛围灯控制氛围灯
function ChangeAmbianceLights(){
    event.turnOnAmbianceLights();
    lightIds.forEach(id => {
        event.changelight(id, 1000);             //将氛围灯的色温控制位1000k
    });
}
//打开投影仪，投影圣诞来人图像并旋转
function controlProjectors(){
    event.turnOnProjectors();
    event.ProjectorsDisplay("Santa Claus.jpeg");
    getProjects().action="rotate";
}
// 初始化
function setupChristmasScene() {
    controlChristmasLights(lightIds);
    controlProjectors();
    playMerryChristmas();
    ChangeAmbianceLights();
}
setupChristmasScene();