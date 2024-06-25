function openCurtains() {
    console.log("Opening curtains.");
    event.openCurtains();
}

function closeCurtains() {
    console.log("Closing curtains.");
    event.closeCurtains();
}

function turnOnLights() {
    console.log("Turning on lights.");
    event.turnOnLights();
}

function turnOffLights() {
    console.log("Turning off lights.");
    event.turnOffLights();
}

function playRomanticMusic() {
    console.log("Playing romantic music.");
    event.playMusic("Romantic Playlist");
}

function stopMusic() {
    console.log("Stopping music.");
    event.stopMusic();
}

function setTemperature(temp) {
    console.log(`Setting temperature to ${temp}°C.`);
    event.setTemperature(temp);
}

function prepareDinner() {
    console.log("Preparing dinner.");
    event.prepareDinner();
}

function startDateNight() {
    if (event.startDateNight) {
        openCurtains();
        turnOnLights();
        playRomanticMusic();
        setTemperature(22);
        prepareDinner();
    }
}

function endDateNight() {
    if (event.endDateNight) {
        closeCurtains();
        turnOffLights();
        stopMusic();
    }
}


