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

// 启动办公模式
function startWorkMode() {
    console.log("Starting work mode.");
    event.turnOnWorkLights();
    event.startComputer();
    event.startMonitor();                   //开启显示器
    adjustEnvironment();
}

// 调整办公环境
function adjustEnvironment() {
    const lightIntensity = getLightIntensity();
    const temperature = getTemperature();
    const airQuality = getAirQuality();

    if (lightIntensity < 300) {
        console.log("Adjusting office lighting to brighter setting");
        event.adjustLighting("brighter");
    } else {
        console.log("Adjusting office lighting to dimmer setting");
        event.adjustLighting("dimmer");
    }

    if (temperature > 25) {
        console.log("Room is too hot. Turning on air conditioner.");
        event.turnOnAirConditioner();
    } else {
        console.log("Room temperature is comfortable. Turning off air conditioner.");
        event.turnOffAirConditioner();
    }

    if (airQuality < 50) {
        console.log("Air quality is poor. Turning on air purifier.");
        event.turnOnAirPurifier();
    } else {
        console.log("Air quality is good. Turning off air purifier.");
        event.turnOffAirPurifier();
    }
}

// 播放背景音乐
function playBackgroundMusic() {
    console.log("Playing background music.");
    event.playMusic("Background Music");
}

// 启动番茄钟
function startPomodoroTimer() {
    console.log("Starting pomodoro timer.");
    event.startPomodoro();
}

// 视频会议模式
function startVideoConference() {
    console.log("Starting video conference mode.");
    event.adjustCamera("optimal");
    event.optimizeLighting("video");
    event.stopMusic();
}

// 健康休息提示
function healthReminders() {
    setInterval(() => {
        console.log("Time to take a break and stretch.");
        event.sendReminder("Take a break and stretch.");
    }, 3600000); // 每小时提醒一次
}

// 结束办公模式
function endWorkMode() {
    console.log("Ending work mode.");
    event.turnOffWorkLights();
    event.stopComputer();
    event.stopMonitor();
    event.adjustLighting("comfortable");
    event.playMusic("Relaxing Music");
}

// 事件处理
eventBus.on('startWork', () => {
    startWorkMode();
    playBackgroundMusic();
    startPomodoroTimer();
    healthReminders();
});

eventBus.on('startMeeting', () => {
    startVideoConference();
});

eventBus.on('endWork', () => {
    endWorkMode();
});

// 初始化
function setupWorkScene() {
    // 模拟启动智能办公场景
    eventBus.emit('startWork'); // 模拟开始工作
    eventBus.emit('startMeeting'); // 模拟开始会议
    setTimeout(() => eventBus.emit('endWork'), 28800000); // 8小时后模拟结束工作
}

// 启动智能办公场景
setupWorkScene();
