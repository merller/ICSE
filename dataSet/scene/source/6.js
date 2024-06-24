function turnOffLights() {
    event.turnOffLights();
}

function closeCurtains() {
    event.closeCurtains();
}

function playSoothingMusic(track, duration) {
    event.playMusic(track);
    setTimeout(() => {
        event.stopMusic(track);
    }, duration * 60 * 1000);
}

function setAirConditionerTemperature(temperature) {
    event.setAirConditionerTemperature(temperature);
}

function turnOnNightLight() {
    console.log("Turning on night light");
    event.turnOnNightLight();
}

function StartSleep(){
    if(event.StartSleep) {
        turnOffLights();
        closeCurtains();
        playSoothingMusic("Soothing Sounds", 30);
        setAirConditionerTemperature(22);
        turnOnNightLight();
    }
}

function setupNightMode() {
    console.log("Setting up sleep mode");
     eventBus.emit('StartSleep');
}

