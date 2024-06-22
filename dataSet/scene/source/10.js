/**
"accurate_docstring": "When abnormal movement is detected in the house, 
    trigger the alarm system, turn on all lights, and play a warning sound 
    through the smart speaker system. Activate the cameras to record and send 
    real-time video streams to the homeowner's mobile phone. Check if all doors 
    and windows are closed; if any are open, issue a warning alert. Connect with 
    the alarm company, automatically sending an alert message to the company. 
    After the homeowner confirms safety, turn off the alarm system, restore normal 
    lighting, and stop camera recording.",
"docstring": "Smart home security scene: Detect abnormal movement and trigger alarm,
    activate camera recording, check door and window status, notify alarm company, and
    reset system after safety confirmation.",
"general_docstring": "Smart home security: automatic detection, alarm, recording, 
    door/window check, and notify alarm company."
  accurate_docstring是对整个函数的精准描述，其中所出现的功能描述都应在代码中找到具体的
  函数，描述应具体到什么设备，执行什么设置（参数），并且描述中不应出现感情词。例如：
    1.上述trigger the alarm system代码中没有函数对应，这句话是否需要。
    2.上述turn on all lights，代码中没有体现所有灯的开启，而仅仅是turnONLights。
    3.上述restore normal lighting有点偏泛化的描述，是否应该修改为turnOffLights。同时，其余代码的精准描述中还存在，灯光暖色调这种泛化描述，应具体设置为色温多少K
    4.Connect with the alarm company没有具体代码体现
  docstring为第二级描述，将accurate_docstring中的设备具体参数设置泛化为情感词，如3500K修改为暖色调
  general_docstring为第三级描述，将docstring中的设备泛化，不再指明具体是什么设备
    */

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
