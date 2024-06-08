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

// 地下停车场灯光控制
function controlGarageLights(state) {
    console.log(`Turning ${state} garage lights.`);
    event.controlGarageLights(state);
}

// 空车位显示屏
function updateParkingAvailability() {
    const availability = getParkingAvailability();
    console.log(`Updating parking availability: ${availability} spaces available.`);
    event.updateParkingAvailability(availability);
}

// 智能监控启动车牌识别
function recognizeLicensePlate() {
    const licensePlate = getLicensePlate();
    console.log(`Recognized license plate: ${licensePlate}`);
    event.recognizeLicensePlate(licensePlate);
}

// 自动收费机
function processPayment(licensePlate) {
    console.log(`Processing payment for license plate: ${licensePlate}`);
    event.processPayment(licensePlate);
}

// 事件处理
eventBus.on('carEntering', () => {
    controlGarageLights('on');
    recognizeLicensePlate();
    updateParkingAvailability();
});

eventBus.on('carExiting', () => {
    const licensePlate = getLicensePlate();
    processPayment(licensePlate);
    updateParkingAvailability();
    controlGarageLights('off');
});

// 初始化
function setupParkingGarageScene() {
    eventBus.emit('carEntering'); // 模拟停车场入口传感器触发
    eventBus.emit('carExiting'); // 模拟停车场出口传感器触发
}

// 启动停车场场景
setupParkingGarageScene();
