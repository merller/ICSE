function turnOnReadingLight() {
    console.log("Turning on reading light.");
    event.turnOnReadingLight();
}

function turnOffReadingLight() {
    console.log("Turning off reading light.");
    event.turnOffReadingLight();
}

function playSoftMusic() {
    console.log("Playing soft background music.");
    event.playMusic("Soft Music");
}

function stopSoftMusic() {
    console.log("Stopping soft background music.");
    event.stopMusic();
}

function adjustTemperature(temp) {
    console.log(`Adjusting room temperature to ${temp}°C`);
    event.adjustTemperature(temp);
}

function monitorEnvironment() {
    setInterval(() => {
        const lightIntensity = getLightIntensity();
        const temperature = getTemperature();
        console.log(`Light intensity: ${lightIntensity} Lux, Temperature: ${temperature}°C`);
        event.show(`Light intensity: ${lightIntensity} Lux, Temperature: ${temperature}°C`);
    }, 300000);
}

function startReading() {
    if (event.startReading) {
        turnOnReadingLight();
        playSoftMusic();
        adjustTemperature(22);
        monitorEnvironment();
    }
}

function endReading() {
    if (event.endReading) {
        turnOffReadingLight();
        stopSoftMusic();
    }
}


