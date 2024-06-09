function startTimer() {
    console.log("Starting the race timer.");
    event.startRaceTimer();
}
function stopTimer() {
    console.log("Stopping the race timer.");
    event.stopRaceTimer();
}
function updateScoreboard(score,team) {
    console.log(`Updating steam${team} scoreboard with score: ${score}`);
    event.updateScoreboard(score,team);
}
function playRaceMusic() {
    console.log("Playing race background music.");
    event.playMusic("Race Playlist");
}
function stopRaceMusic() {
    console.log("Stopping race background music.");
    event.stopMusic();
}
function startLiveStream() {
    console.log("Starting the live stream.");
    event.startLiveStream();
}
function stopLiveStream() {
    console.log("Stopping the live stream.");
    event.stopLiveStream();
}
eventBus.on('startRace', () => {
    startTimer();
    playRaceMusic();
    startLiveStream();
});
eventBus.on('aScore', (score) => {
    updateScoreboard(score,a);
});
eventBus.on('bScore', (score) => {
    updateScoreboard(score,b);
});
eventBus.on('endRace', () => {
    stopTimer();
    stopRaceMusic();
    stopLiveStream();
});
function setupRaceScene() {
    eventBus.emit('startRace'); 
    eventBus.emit('ascore'); 
    eventBus.emit('bscore'); 
    setTimeout(() => eventBus.emit('endRace'), 7200000); 
}
setupRaceScene();
