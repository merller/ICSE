function adjustLighting(lightIds, temperature, brightness) {
    lightIds.forEach(id => {
        console.log(`Adjusting light ${id} to ${temperature}K and ${brightness}% brightness`);
        event.changelight(id, temperature, brightness);
    });
}
function playMusic(track, duration) {
    console.log(`Playing music track: ${track} for ${duration} seconds`);
    event.playMusic(track);
    setTimeout(() => {
        event.stopMusic(track);
    }, duration * 1000);
}
function stopMusic(track) {
    console.log(`Stopping music track: ${track}`);
    event.stopMusic(track);
}
function setAirConditionerTemperature(temperature) {
    console.log(`Setting air conditioner temperature to ${temperature}℃`);
    event.setAirConditionerTemperature(temperature);
}
function startFragranceMachine() {
    console.log("Starting fragrance machine");
    event.startFragranceMachine();
}
function stopFragranceMachine() {
    console.log("Stopping fragrance machine");
    event.stopFragranceMachine();
}
function adjustCurtains(action) {
    console.log(`Adjusting curtains to ${action}`);
    event.adjustCurtains(action);
}
eventBus.on('existPressure', () => {
    adjustLighting([1, 2, 3], 2700, 50); 
    playMusic("Relaxing Music", 1800); 
    setAirConditionerTemperature(22);
    startFragranceMachine();
    adjustCurtains('close'); 
});
eventBus.on('NoPressure', () => {
    stopMusic("Relaxing Music");
    stopFragranceMachine();
    adjustLighting([1, 2, 3], 3500, 100); 
    adjustCurtains('open'); 
});
function setupMeditationScene() {
     eventBus.emit('existPressure'); 
    eventBus.emit('NoPressure'); 
}
setupMeditationScene();
