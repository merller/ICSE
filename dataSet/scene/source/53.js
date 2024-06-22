// Function to check soil moisture level
function checkSoilMoisture(zone) {
    let moistureLevel = event.getSoilMoisture(zone);
    console.log(`Soil moisture level in ${zone}: ${moistureLevel}%`);
    return moistureLevel;
}

// Function to control irrigation in a specific zone
function controlIrrigation(zone, state) {
    console.log(`${state} irrigation in ${zone}.`);
    event.controlIrrigation(zone, state);
}

// Function to adjust irrigation based on weather forecast
function adjustIrrigationForWeather(forecast) {
    if (forecast === 'rain') {
        console.log("Rain forecasted. Turning off irrigation.");
        event.turnOffAllIrrigation();
    } else {
        console.log("No rain forecasted. Maintaining scheduled irrigation.");
        event.maintainScheduledIrrigation();
    }
}

// Function to control garden lighting
function controlGardenLighting(state, colorTemperature) {
    console.log(`Turning garden lights ${state} with color temperature ${colorTemperature}K.`);
    event.controlGardenLighting(state, colorTemperature);
}

// Function to manage garden care based on soil moisture levels
function manageGardenCare() {
    let zones = ['flower bed', 'vegetable patch', 'herb garden'];
    zones.forEach(zone => {
        let moistureLevel = checkSoilMoisture(zone);
        if (moistureLevel < 30) {
            controlIrrigation(zone, 'on');
        } else {
            controlIrrigation(zone, 'off');
        }
    });
}

// Morning routine to prepare garden for the day
function morningGardenRoutine() {
    if (event.morningGardenRoutine) {
        manageGardenCare();
        adjustIrrigationForWeather(event.getWeatherForecast());
        controlGardenLighting('on', 5000);
    }
}

// Evening routine to adjust garden lighting and irrigation
function eveningGardenRoutine() {
    if (event.eveningGardenRoutine) {
        manageGardenCare();
        controlGardenLighting('off', 0);
        controlIrrigation('herb garden', 'on');
    }
}
//The morning garden routine involves checking soil moisture levels in specific zones such as the flower bed, vegetable patch, and herb garden. Based on these levels, irrigation is adjusted: if moisture is below 30%, irrigation is turned on. Additionally, the routine adjusts irrigation based on the weather forecast to avoid unnecessary watering during rainy conditions. Furthermore, garden lighting is activated with a specific color temperature of 5000K to optimize growth conditions. In the evening, the routine repeats with garden care management, adjusting garden lighting to turn it off completely and selectively activating irrigation for zones like the herb garden.
//Daily garden routines include checking and adjusting irrigation based on soil moisture levels in various zones like the flower bed, vegetable patch, and herb garden. Irrigation is managed efficiently by turning it on when moisture levels are low, ensuring plants receive adequate water without overwatering, especially when no rain is forecasted. Garden lighting is set to support growth with appropriate conditions during the day, while in the evening, lighting is adjusted for energy conservation, and targeted irrigation may continue where necessary.
//Daily garden management, inculding soil, watering, and lighting control.