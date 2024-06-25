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

function feedPet() {
    console.log("Feeding pet.");
    event.feedPet();
}

function needCleaning() {
    if (event.needCleaning) {
        startCleaningRobot();
        turnOnAirPurifier();
        playRelaxingMusic();
    }
}

function endCleaning() {
    if (event.endCleaning) {
        stopCleaningRobot();
        turnOffAirPurifier();
        stopMusic();
        feedPet();
    }
}


