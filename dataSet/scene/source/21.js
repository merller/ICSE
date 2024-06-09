function activateAutonomousDriving() {
    console.log("Activating autonomous driving mode.");
    event.activateAutonomousDriving();
}
function activateParkingAssistance() {
    console.log("Activating parking assistance.");
    event.activateParkingAssistance();
}
function playTrafficReport() {
    console.log("Playing traffic report.");
    event.playTrafficReport();
}
function updateWeather() {
    console.log("Updating weather information.");
    event.updateWeather();
}
function adjustCarTemperature(temp) {
    console.log(`Setting car temperature to ${temp}°C.`);
    event.adjustCarTemperature(temp);
}
eventBus.on('startJourney', () => {
    activateAutonomousDriving();
    playTrafficReport();
    updateWeather();
    adjustCarTemperature(22);
});
eventBus.on('startParking', () => {
    activateParkingAssistance();
});
eventBus.on('endJourney', () => {
    console.log("Journey ended. Turning off autonomous driving mode.");
    event.deactivateAutonomousDriving();
    console.log("Stopping traffic report.");
    event.stopTrafficReport();
});
function setupTransportScene() {
    eventBus.emit('startJourney'); 
    setTimeout(() => eventBus.emit('startParking'), 1800000); 
    setTimeout(() => eventBus.emit('endJourney'), 3600000); 
}
setupTransportScene();
