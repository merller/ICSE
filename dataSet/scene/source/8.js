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
    event.adjustThermostate(temperature);
}

function turnOnFillLights(){
    event.turnOnFillLights();
}

function turnOnLights(){
    event.turnOnLights();
}

eventBus.on('dry', () => {
    startWatering();
});
eventBus.on('moist', () => {
    stopWatering();
});
eventBus.on('night',()=>{
    turnOnFillLights();
})

eventBus.on('doorMovement', () => {
    turnOnLights();
    playNatureSounds();
});

function setupGardenScene() {
    trackPlantGrowth();
    environmentalMonitoring();
    adjustThermostat();
     eventBus.emit('doorMovement');

}

setupGardenScene();
