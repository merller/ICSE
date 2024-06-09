function turnOnLight(){
    event.turnOnLight();
}
function turnOffLight(){
    event.turnOffLight();
}
function controlFans(speed) {
    console.log(`Setting fan speed to ${speed}`);
    event.controlFan(speed);
}
function turnOnAirCleaner(){
    event.turnOnAirCleaner();
}
function turnOnSmartOutlets(){
    event.turnOnOutlets();
}
function turnOffSmartOutlets(){
    event.turnOffOutlets();
}
function broadcast(text) {
    event.broadcast(track);
}
var number=0;
eventBus.on('EntranceDoorMovement', () => {
    if(number==0)
    {
        turnOnLight();
        turnOnSmartOutlets();
        controlFans(1000);
        number++;
    }
    broadcast("Welcome");
});
eventBus.on('exitDoorMovement', () => {
    if(number==1)
    {
        turnOffLight();
        turnOffSmartOutlets();
        number--;
    }
    broadcast("Have a good day");
});
function setupWeddingScene() {
    turnOnAirCleaner()
    eventBus.emit('EntranceDoorMovement');
    eventBus.emit('exitDoorMovement');
}


setupWeddingScene();