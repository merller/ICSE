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
//打开香氛机
function turnOnFragranceMachine() {
    event.turnOnFragranceMachine();
}
// 控制空调温度
function setAirConditionerTemperature(temperature) {
    console.log(`Setting air conditioner temperature to ${temperature}℃`);
    event.setAirConditionerTemperature(temperature);
}
// 调节灯光温度
function adjustLighting(lightIds, temperature) {
    lightIds.forEach(id => {
        event.turnOnlight(id);
        event.changelight(id, temperature);
    });
}
//播放生日歌
function playHappyBirthday(){
    event.playMusic('happy birthday');
}
//显示屏播放电子相册
function displayPhotos(){
    event.turnOnScreen();                  //打开电子屏
    getphoto().forEach(photo=>{setTimeout(()=>{event.display(photo)},1000);})                          //每张照片轮播一秒
}
eventBus.on('fontDoorMovement',()=>{
    adjustLighting(getLightId(),1000);        //全部灯光打开，调整为温馨灯光
    playHappyBirthday();
    displayPhotos();
})
function  setupBirthdayScene(){
    setAirConditionerTemperature(23);
    turnOnFragranceMachine();
    setTimeout(()=>eventBus.emit('fontDoorMovement'),1000);
}
setupBirthdayScene();
