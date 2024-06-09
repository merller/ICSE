function playBackgroundMusic(track, duration) {
    console.log(`Playing background music: ${track} for ${duration} minutes`);
    event.playMusic(track);
    setTimeout(() => {
        event.stopMusic(track);
    }, duration * 60 * 1000);
}
function adjustLighting(temperature) {
    console.log(`Adjusting lighting to ${temperature}K`);
    event.adjustLighting(temperature);
}

function preheatOven(temperature) {
    console.log(`Preheating oven to ${temperature}℃`);
    event.preheatOven(temperature);
}

function turnOnAirCleaner() {
    console.log("Turning on air cleaner");
    event.turnOnAirCleaner();
}

eventBus.on('dinnerTime', () => {
    playBackgroundMusic("Dinner Jazz", 120);
    adjustLighting(2700);
    preheatOven(180);
    turnOnAirCleaner();
});

function setupDinnerScene() {
    console.log("Setting up dinner scene");
     eventBus.emit('dinnerTime');
}

setupDinnerScene();
