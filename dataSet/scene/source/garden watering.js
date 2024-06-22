// Function to start watering the garden
function startWatering() {
    console.log("Starting watering.");
    event.startWatering();
}

// Function to stop watering the garden
function stopWatering() {
    console.log("Stopping watering.");
    event.stopWatering();
}

// Function to check soil moisture level
function checkSoilMoisture() {
    let moistureLevel = event.getSoilMoisture();
    console.log(`Soil moisture level: ${moistureLevel}%`);
    return moistureLevel;
}

// Function to set a watering schedule
function setWateringSchedule(time) {
    console.log(`Setting watering schedule to ${time}.`);
    event.setWateringSchedule(time);
}

// Function to adjust watering based on soil moisture
function adjustWatering(moistureLevel) {
    if (moistureLevel < 30) {
        console.log("Soil is dry. Increasing watering duration.");
        event.increaseWateringDuration(30); // Increase by 30 minutes
    } else {
        console.log("Soil moisture is sufficient. Standard watering duration.");
        event.setStandardWateringDuration();
    }
}

// Routine to water the garden in the morning
function morningWateringRoutine() {
    if(event.morningWateringRoutine) {
        startWatering();
        setWateringSchedule('06:00');
        let moistureLevel = checkSoilMoisture();
        adjustWatering(moistureLevel);
        stopWatering();
    }
}

// Routine to check soil moisture and adjust watering in the evening
function eveningWateringRoutine() {
    if(event.eveningWateringRoutine) {
        let moistureLevel = checkSoilMoisture();
        adjustWatering(moistureLevel);
    }
}
//When in the morningWateringRoutine, the system starts watering the garden, sets the watering schedule to 06:00, checks the soil moisture level, adjusts the watering duration based on the moisture level, and stops watering. If the soil is dry (moisture level < 30%), the watering duration is increased by 30 minutes. If the soil moisture is sufficient, the standard watering duration is set. When in the eveningWateringRoutine, the system checks the soil moisture level and adjusts the watering duration based on the moisture level.
//When in the morningWateringRoutine, the system starts watering, sets the schedule, checks the soil moisture, adjusts the watering based on the moisture level, and stops watering. When in the eveningWateringRoutine, the system checks the soil moisture and adjusts the watering.
//Manages garden watering by checking soil moisture and adjusting the watering schedule and duration.