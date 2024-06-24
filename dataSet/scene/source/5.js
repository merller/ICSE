function playMusic(track, duration) {
    console.log(`Playing music: ${track} for ${duration} seconds`);
    playMusic(track);
    setTimeout(() => {
        stopMusic(track);
    }, duration * 1000);
}

function openCurtains() {
    console.log("Opening curtains");
    openCurtains();
}

function startCoffeeMaker() {
    console.log("Starting coffee maker");
    startCoffeeMaker();
}

function adjustLighting(temperature) {
    console.log(`Adjusting lighting to ${temperature}K`);
    adjustLighting(temperature);
}

function turnOnAirCleaner() {
    console.log("Turning on air cleaner");
    turnOnAirCleaner();
}

function morningWakeUp() {
    if(event.morningWakeUp)
    playMusic("Morning Melody", 300);
    openCurtains();
    startCoffeeMaker();
    adjustLighting(3000);
    turnOnAirCleaner();
}

function setupMorningScene() {
    if(event.setupMorningScene)
    console.log("Setting up morning wake-up scene");
    morningWakeUp();
}

