
function turnOnFragranceMachine() {
    event.turnOnFragranceMachine();
}

function setAirConditionerTemperature(temperature) {
    console.log(`Setting air conditioner temperature to ${temperature}℃`);
    event.setAirConditionerTemperature(temperature);
}

function adjustLighting(lightIds, temperature) {
    lightIds.forEach(id => {
        event.turnOnlight(id);
        event.changelight(id, temperature);
    });
}

function playHappyBirthday(){
    event.playMusic('happy birthday');
}

function displayPhotos(){
    event.turnOnScreen();                  
    getphoto().forEach(photo=>{setTimeout(()=>{event.display(photo)},1000);})
}

function fontDoorMovement(){
    if(event.fontDoorMovement){
        adjustLighting(getLightId(),1000);
        playHappyBirthday();
        displayPhotos();
    }

}

function  setupBirthdayScene(){
    setAirConditionerTemperature(23);
    turnOnFragranceMachine();
    setTimeout(()=>eventBus.emit('fontDoorMovement'),1000);
}

setupBirthdayScene();
