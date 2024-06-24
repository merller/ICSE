function turnOnLight(){
    turnOnLight();
}

function turnOffLight(){
    turnOffLight();
}

function controlFans(speed) {
    console.log(`Setting fan speed to ${speed}`);
    controlFan(speed);
}

function turnOnAirCleaner(){
    turnOnAirCleaner();
}

function turnOnSmartOutlets(){
    turnOnOutlets();
}

function turnOffSmartOutlets(){
    turnOffOutlets();
}

function broadcast(text) {
    broadcast(text);
}

let number = 0;

function entranceDoorMovement() {
    if(event.entranceDoorMovement){
        if(number == 0) {
            turnOnLight();
            turnOnSmartOutlets();
            controlFans(1000);
            number++;
        }
        broadcast("Welcome");
    }
}

function exitDoorMovement() {
    if(event.exitDoorMovement) {
        if(number == 1) {
            turnOffLight();
            turnOffSmartOutlets();
            number--;
        }
        broadcast("Have a good day");
    }
}

function setupWeddingScene() {
    if(event.setupWeddingScene){
        turnOnAirCleaner();
        entranceDoorMovement();
        exitDoorMovement();
    }
}
