function startWorkMode() {
    console.log("Starting work mode.");
    event.turnOnWorkLights();
    event.startComputer();
    event.startMonitor();                   
    adjustEnvironment();
}

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


function playBackgroundMusic() {
    console.log("Playing background music.");
    event.playMusic("Background Music");
}


function startPomodoroTimer() {
    console.log("Starting pomodoro timer.");
    event.startPomodoro();
}


function startVideoConference() {
    console.log("Starting video conference mode.");
    event.adjustCamera("optimal");
    event.optimizeLighting("video");
    event.stopMusic();
}


function healthReminders() {
    setInterval(() => {
        console.log("Time to take a break and stretch.");
        event.sendReminder("Take a break and stretch.");
    }, 3600000); 
}


function endWorkMode() {
    console.log("Ending work mode.");
    event.turnOffWorkLights();
    event.stopComputer();
    event.stopMonitor();
    event.adjustLighting("comfortable");
    event.playMusic("Relaxing Music");
}


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


function setupWorkScene() {
    
    eventBus.emit('startWork'); 
    eventBus.emit('startMeeting'); 
    setTimeout(() => eventBus.emit('endWork'), 28800000); 
}


setupWorkScene();
