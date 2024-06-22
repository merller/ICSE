// Function to monitor soil moisture
function monitorSoilMoisture(field) {
    let moistureLevel = event.getSoilMoisture(field);
    console.log(`Soil moisture in ${field}: ${moistureLevel}%`);
    return moistureLevel;
}

// Function to control irrigation system
function controlIrrigation(field, state) {
    console.log(`${state} irrigation in ${field}.`);
    event.controlIrrigation(field, state);
}

// Function to track livestock
function trackLivestock(livestockId) {
    let location = event.getLivestockLocation(livestockId);
    console.log(`Location of livestock ${livestockId}: ${location}`);
    return location;
}

// Function to send farm alert
function sendFarmAlert(message) {
    console.log(`Sending farm alert: ${message}`);
    event.sendFarmAlert(message);
}

// Morning routine for farm management
function morningRoutine() {
    if (event.morningRoutine) {
        monitorSoilMoisture('north field');
        controlIrrigation('north field', 'on');
        trackLivestock('cow1');
    }
}

// Evening routine for farm management
function eveningRoutine() {
    if (event.eveningRoutine) {
        monitorSoilMoisture('south field');
        controlIrrigation('south field', 'off');
        sendFarmAlert('Farm management systems shutting down for the night.');
    }
}
