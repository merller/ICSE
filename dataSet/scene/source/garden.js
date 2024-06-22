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

// Function to set a watering schedule
function setWateringSchedule(time) {
    console.log(`Setting watering schedule to ${time}.`);
    event.setWateringSchedule(time);
}

// Function to adjust the water flow level
function adjustWaterFlow(level) {
    console.log(`Adjusting water flow to level ${level}.`);
    event.adjustWaterFlow(level);
}

// Function to control water flow based on soil moisture and weather forecast
function adaptiveWaterFlowControl(soilMoisture, forecast) {
    let flowLevel;
    if (forecast === 'rain') {
        flowLevel = 1; // Minimal watering
    } else if (soilMoisture < 30) {
        flowLevel = 5; // High watering for dry soil
    } else {
        flowLevel = 3; // Moderate watering
    }

    adjustWaterFlow(flowLevel);
}

// Garden routine that starts watering, sets the schedule, and adjusts the water flow
function gardenRoutine(soilMoisture, forecast) {
    if(event.gardenRoutine) {
        startWatering();
        setWateringSchedule('06:00');
        adaptiveWaterFlowControl(soilMoisture, forecast);
    }
}

// Evening garden routine that stops watering and sets a low water flow
function eveningGardenRoutine() {
    if(event.eveningGardenRoutine) {
        stopWatering();
        adjustWaterFlow(2);
    }
}
//When in the gardenRoutine, the system starts watering the garden, sets the watering schedule to 06:00, and adjusts the water flow based on soil moisture and weather forecast. If the forecast is 'rain', sets water flow to level 1; if soil moisture is below 30, sets water flow to level 5; otherwise, sets water flow to level 3. When in the eveningGardenRoutine, the system stops watering and sets water flow to level 2.
//When in the gardenRoutine, the system starts watering, sets the schedule, and adjusts the water flow based on soil moisture and forecast. When in the eveningGardenRoutine, the system stops watering and sets a low water flow.
//Starts or stops watering and adjusts the water flow based on conditions.
