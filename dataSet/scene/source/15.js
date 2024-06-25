function adjustLighting(lightIds, temperature) {
    lightIds.forEach(id => {
        console.log(`Adjusting light ${id} to ${temperature}K`);
        event.changelight(id, temperature);
    });
}

function playMusic(track, duration) {
    console.log(`Playing music track: ${track} for ${duration} seconds`);
    event.playMusic(track);
    setTimeout(() => {
        event.stopMusic(track);
    }, duration * 1000);
}

function setAirConditionerTemperature(temperature) {
    console.log(`Setting air conditioner temperature to ${temperature}℃`);
    event.setAirConditionerTemperature(temperature);
}

function startSmartMirror() {
    console.log("Starting smart mirror with yoga guidance");
    event.showdata();
}

function startAirPurifier() {
    console.log("Starting air purifier");
    event.startAirPurifier();
}

function startFitnessTracker() {
    console.log("Starting fitness tracker");
    event.startFitnessTracker();
}

function yogaSessionStart() {
    if (event.yogaSessionStart) {
        adjustLighting([1, 2, 3], 2700);
        playMusic("Yoga Playlist", 3600);
        setAirConditionerTemperature(22);
        startSmartMirror();
        startAirPurifier();
        startFitnessTracker();
    }
}

function mirrorExistPerson() {
    if (event.MirrorExistPerson) {
        startSmartMirror();
    }
}

function setupYogaScene() {
    yogaSessionStart();
    mirrorExistPerson();
}

setupYogaScene();
