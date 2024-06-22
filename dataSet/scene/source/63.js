// Function to monitor livestock health
function monitorLivestockHealth(livestockId) {
    let healthStatus = event.getLivestockHealth(livestockId);
    console.log(`Livestock ${livestockId} health status: ${JSON.stringify(healthStatus)}`);
    return healthStatus;
}

// Function to manage feeding schedule
function manageFeedingSchedule(livestockId, time) {
    console.log(`Setting feeding schedule for livestock ${livestockId} at ${time}.`);
    event.manageFeedingSchedule(livestockId, time);
}

// Function to control barn temperature
function controlBarnTemperature(barn, temp) {
    console.log(`Setting barn ${barn} temperature to ${temp}°C.`);
    event.controlBarnTemperature(barn, temp);
}

// Function to send veterinary alert
function sendVeterinaryAlert(livestockId) {
    console.log(`Sending veterinary alert for livestock ${livestockId}.`);
    event.sendVeterinaryAlert(livestockId);
}

// Morning routine for livestock care
function morningLivestockCare(livestockId, barn) {
    if (event.morningLivestockCare) {
        monitorLivestockHealth(livestockId);
        manageFeedingSchedule(livestockId, '06:00');
        controlBarnTemperature(barn, 20);
    }
}

