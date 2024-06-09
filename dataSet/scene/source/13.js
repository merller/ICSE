function turnOnLights(){
   event.turnOnLights();
}
function turnOffLights(){
    event.turnOffLights();
}
function turnOnDeskLamp(){
    event.turnOnDeskLamp()
}
function turnOffDeskLamp(){
    event.turnOffDeskLamp()
}
function playWhiteNoise(name){
        event.playWhiteNoise(name);
}
function stopWhiteNoise(name){
    event.stopWhiteNoise();
}
function trackLearning(){
    setInterval(() => {
        let graphics=getGraphics();
        event.sendMessage(graphics)
    }, 3600000); 
}
function healthReminders() {
    setInterval(() => {
        console.log("Time to take a break and stretch.");
        event.sendReminder("Take a break and stretch.");
    }, 3600000); 
}
eventBus.on('StartLearning', () => {
    turnOnLights();
    turnOnDeskLamp();
    playWhiteNoise('rain');
    trackLearning();
    healthReminders();
});
eventBus.on('EndLearning', () => {
    turnOffLights();
    turnOffDeskLamp();
    stopWhiteNoise();
});
function setupLearningScene() {
    eventBus.emit('StartLearning'); 
    setTimeout(() => eventBus.emit('EndLearning'), 10800000); 
}
setupsetupLearningScene