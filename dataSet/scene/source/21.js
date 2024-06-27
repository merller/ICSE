function activateAutonomousDriving() {
    console.log("Activating autonomous driving mode.");
    event.activateAutonomousDriving();
}

function activateParkingAssistance() {
    console.log("Activating parking assistance.");
    event.activateParkingAssistance();
}

function playTrafficReport() {
    console.log("Playing traffic report.");
    event.playTrafficReport();
}

function updateWeather() {
    console.log("Updating weather information.");
    event.updateWeather();
}

function adjustCarTemperature(temp) {
    console.log(`Setting car temperature to ${temp}°C.`);
    event.adjustCarTemperature(temp);
}

function deactivateAutonomousDriving() {
    console.log("Journey ended. Turning off autonomous driving mode.");
    event.deactivateAutonomousDriving();
}

function stopTrafficReport() {
    console.log("Stopping traffic report.");
    event.stopTrafficReport();
}

function startJourney() {
    if (event.startJourney) {
        activateAutonomousDriving();
        playTrafficReport();
        updateWeather();
        adjustCarTemperature(22);
    }
}

function startParking() {
    if (event.startParking) {
        activateParkingAssistance();
    }
}

function endJourney() {
    if (event.endJourney) {
        deactivateAutonomousDriving();
        stopTrafficReport();
    }
}


