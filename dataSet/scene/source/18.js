function startCleaningRobot() {
    console.log("Starting cleaning robot.");
    event.startCleaningRobot();
}
function stopCleaningRobot() {
    console.log("Stopping cleaning robot.");
    event.stopCleaningRobot();
}
function turnOnAirPurifier() {
    console.log("Turning on air purifier.");
    event.turnOnAirPurifier();
}
function turnOffAirPurifier() {
    console.log("Turning off air purifier.");
    event.turnOffAirPurifier();
}
function playRelaxingMusic() {
    console.log("Playing relaxing music.");
    event.playMusic("Relaxing Music");
}
function stopMusic() {
    console.log("Stopping music.");
    event.stopMusic();
}
eventBus.on('needCleaning', () => {
    startCleaningRobot();
    turnOnAirPurifier();
    playRelaxingMusic();
});
eventBus.on('endCleaning', () => {
    stopCleaningRobot();
    turnOffAirPurifier();
    stopMusic();
    feedPet();
});
function setupHomeCleaningScene() {
    eventBus.emit('needCleaning'); 
     eventBus.emit('endCleaning'); 
}
setupHomeCleaningScene();
