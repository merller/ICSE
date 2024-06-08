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

// 启动摄像头录像
function startRecording() {
    console.log("Starting camera recording.");
    event.startRecording();
}

// 停止摄像头录像
function stopRecording() {
    console.log("Stopping camera recording.");
    event.stopRecording();
}

// 发送警报信息给安全公司
function sendAlert() {
    console.log("Sending alert to security company.");
    event.sendAlert();
}

// 检查门窗状态
function checkDoorsAndWindows() {
    const allClosed = event.checkDoorsAndWindows();
    if (!allClosed) {
        console.log("Some doors or windows are open. Sending alert.");
        event.sendWarning("Some doors or windows are open.");
    }
}

// 播放警告声音
function playWarningSound() {
    console.log("Playing warning sound.");
    event.playWarningSound();
}

// 事件处理
eventBus.on('intrusionDetected', () => {
    event.turnOnLights();
    playWarningSound();
    startRecording();
    sendAlert();
    checkDoorsAndWindows();
});

eventBus.on('safeConfirmed', () => {
    event.turnOffLights();
    stopRecording();
    event.stopWarningSound();
});

// 初始化
function setupSecurityScene() {
    checkDoorsAndWindows();
    // 模拟启动智能安全场景
    eventBus.emit('intrusionDetected'); // 模拟摄像头检测到入侵
     eventBus.emit('safeConfirmed'); // 5分钟后模拟确认安全
}

// 启动智能安全场景
setupSecurityScene();
