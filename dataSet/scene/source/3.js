function  playMusic(track,duration){
    event.playMusic(track,duration*1000);

}
function setAirConditionerTemperature(temperature) {
    console.log(`Setting air conditioner temperature to ${temperature}℃`);
    event.setAirConditionerTemperature(temperature);
}
function controlCurtains(command){
    if(command=='close')
        event.closeCurtains();
    else if(command=='open')
        event.openCurtains();
}
function controlLights(command){
    if(command=='open')
        event.turnOnLights();
    else if(command=='close')
        event.turnOffLights();
}
function playMovie(name){
    event.playMovie(name);
}
eventBus.on('movieNightStart', () => {
    playMusic("Cinematic Soundtrack", 120);
    controlLights('close');
    controlCurtains('close');
});
eventBus.on('movieNightEnd', () => {
    stopMusic("Cinematic Soundtrack");
    controlLights('open');
    controlCurtains('open');
});
function setupMovieScene(){
    setAirConditionerTemperature(23);
    eventBus.emit('movieNightStart');
    playMovie('The Shawshank Redemption');
    eventBus.emit('movieNightEnd');
}
setupMovieScene();