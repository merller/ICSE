function startTimer() {
    console.log("Starting the race timer.");
    event.startRaceTimer();
}

function stopTimer() {
    console.log("Stopping the race timer.");
    event.stopRaceTimer();
}

function updateScoreboard(score, team) {
    console.log(`Updating team ${team} scoreboard with score: ${score}`);
    event.updateScoreboard(score, team);
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

function startRace() {
    if (event.startRace) {
        startTimer();
        playRaceMusic();
        startLiveStream();
    }
}

function aScore(score) {
    if (event.aScore) {
        updateScoreboard(score, "A");
    }
}

function bScore(score) {
    if (event.bScore) {
        updateScoreboard(score, "B");
    }
}

function endRace() {
    if (event.endRace) {
        stopTimer();
        stopRaceMusic();
        stopLiveStream();
    }
}



