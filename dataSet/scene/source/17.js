function playPartyMusic() {
    console.log("Playing party music.");
    event.playMusic("Party Playlist");
}

function stopPartyMusic() {
    console.log("Stopping party music.");
    event.stopMusic();
}

function controlPartyLights(mode) {
    console.log(`Setting lights to ${mode} mode.`);
    event.setLights(mode);
}

function controlFogMachine(action) {
    console.log(`${action} fog machine.`);
    if (action === "Starting") {
        event.startFogMachine();
    } else {
        event.stopFogMachine();
    }
}

function controlLaserLights(action) {
    console.log(`${action} laser lights.`);
    if (action === "Starting") {
        event.startLaserLights();
    } else {
        event.stopLaserLights();
    }
}

let number = 0;

function entranceDoorMovement() {
    if (event.entranceDoorMovement && number === 0) {
        playPartyMusic();
        controlPartyLights("party");
        controlFogMachine("Starting");
        controlLaserLights("Starting");
        number++;
    }
}

function exitDoorMovement() {
    if (event.exitDoorMovement && number === 1) {
        stopPartyMusic();
        controlPartyLights("normal");
        controlFogMachine("Stopping");
        controlLaserLights("Stopping");
        number--;
    }
}


