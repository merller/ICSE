function startWatering(){
    console.log("Soil is dry. Starting watering system.");
    event.startWatering();
}

function stopWatering(){
    console.log("Soil is moist. Stopping watering system.");
    event.stopWatering();
}

function environmentalMonitoring() {
    setInterval(() => {
        const lightIntensity = getLightIntensity();
        const temperature = getTemperature();
        const humidity = getHumidity();
        console.log(`Light intensity: ${lightIntensity} Lux, Temperature: ${temperature}°C, Humidity: ${humidity}%`);
        event.show('Light intensity: '+lightIntensity +'Lux ,Temperature:'+temperature+'°C, Humidity:'+humidity);
    }, 300000);
}

function playNatureSounds() {
    console.log("Playing nature sounds (birds chirping, water flowing, etc.)");
    event.playMusic("Nature Sounds");
}

function trackPlantGrowth() {
    setInterval(() => {
        var plantGraphics = getPlantGraphics();
        event.sendGraphics(plantGraphics);
    }, 86400000);
}

function adjustThermostat(temperature){
    event.adjustThermostat(temperature);
}

function turnOnFillLights(){
    event.turnOnFillLights();
}

function turnOnLights(){
    event.turnOnLights();
}

function onDry() {
    if(event.dry) {
        startWatering();
    }
}

function onMoist() {
    if(event.moist) {
        stopWatering();
    }
}

function onNight() {
    if(event.night) {
        turnOnFillLights();
    }
}

function onDoorMovement() {
    if(event.doorMovement) {
        turnOnLights();
        playNatureSounds();
    }
}




