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

// 启动烤箱
function preheatOven(temperature) {
    console.log(`Preheating oven to ${temperature}°C`);
    event.preheatOven(temperature);
}

// 播放烹饪指导
function playCookingGuide(guide) {
    console.log(`Playing cooking guide: ${guide}`);
    event.playCookingGuide(guide);
}


// 控制智能照明
function adjustLighting() {
    const lightIntensity = getLightIntensity();
    if (lightIntensity < 300) {
        console.log("Adjusting kitchen lighting to brighter setting");
        event.adjustLighting("brighter");
    } else {
        console.log("Adjusting kitchen lighting to dimmer setting");
        event.adjustLighting("dimmer");
    }
}

// 智能风扇
function controlFan() {
    const temperature = getKitchenTemperature();
    if (temperature > 25) {
        console.log("Kitchen is too hot. Turning on fan.");
        event.turnOnFan();
    } else {
        console.log("Kitchen temperature is normal. Turning off fan.");
        event.turnOffFan();
    }
}
//控制除烟机
function adjustFotile(speed){
    if(speed!=0)
    event.adjustfotile(speed);
    else
    event.turnOfffotile();
}
// 事件处理
eventBus.on('startCooking', () => {
    adjustFotile(1000);
    preheatOven(180); // 预热烤箱到180℃
    playCookingGuide("Step-by-step cooking instructions"); // 播放烹饪指导
    monitorEnvironment();
    adjustLighting();
    controlFan();
});
eventBus.on('endCooking', () => {
    adjustFotile(0);
    event.turnOffOven();
    event.turnOffScreen();                         //关掉播放烹饪指导的电子屏
    adjustLighting();
    controlFan();
});
// 初始化
function setupKitchenScene() {
    // 模拟启动智能厨房场景
    eventBus.emit('startCooking'); // 模拟启动烹饪锅
    eventBus.emit('endCooking'); // 模拟关闭烹饪锅
}

// 启动智能厨房场景
setupKitchenScene();
