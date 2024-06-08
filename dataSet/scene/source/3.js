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
//
function  playMusic(track,duration){
    event.playMusic(track,duration*1000);

}
// 控制空调温度
function setAirConditionerTemperature(temperature) {
    console.log(`Setting air conditioner temperature to ${temperature}℃`);
    event.setAirConditionerTemperature(temperature);
}
//控制窗帘
function controlCurtains(command){
    if(command=='close')
        event.closeCurtains();
    else if(command=='open')
        event.openCurtains();
}
//控制灯光
function controlLights(command){
    if(command=='open')
        event.turnOnLights();
    else if(command=='close')
        event.turnOffLights();
}
//投影仪播放电影
function playMovie(name){
    event.playMovie(name);
}

// 家庭影院场景
//电影开启
eventBus.on('movieNightStart', () => {
    playMusic("Cinematic Soundtrack", 120);
    controlLights('close');
    controlCurtains('close');
});
//电影结束
eventBus.on('movieNightEnd', () => {
    stopMusic("Cinematic Soundtrack");
    controlLights('open');
    controlCurtains('open');
});
function setupMovieScene(){
    setAirConditionerTemperature(23);
    //模拟传感器事件触发
    eventBus.emit('movieNightStart');            //模拟电视打开
    playMovie('The Shawshank Redemption');      //模拟播放肖申克的救赎
    eventBus.emit('movieNightEnd');             //模拟电影结束
}
setupMovieScene();