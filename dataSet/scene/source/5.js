function playMusic(track, duration) {
    console.log(`Playing music: ${track} for ${duration} seconds`);
    event.playMusic(track);
    setTimeout(() => {
        event.stopMusic(track);
    }, duration * 1000);
}
function openCurtains() {
    console.log("Opening curtains");
    event.openCurtains();
}

function startCoffeeMaker() {
    console.log("Starting coffee maker");
    event.startCoffeeMaker();
}
function adjustLighting(temperature) {
    console.log(`Adjusting lighting to ${temperature}K`);
    event.adjustLighting(temperature);
}
function turnOnAirCleaner() {
    console.log("Turning on air cleaner");
    event.turnOnAirCleaner();
}

eventBus.on('AM7:00', () => {
    playMusic("Morning Melody", 300);
    openCurtains();
    startCoffeeMaker();
    adjustLighting(3000);
    turnOnAirCleaner();
});

function setupMorningScene() {
    console.log("Setting up morning wake-up scene");
     eventBus.emit('morningWakeUp');
}

setupMorningScene();
