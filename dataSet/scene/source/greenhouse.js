// Function to control greenhouse temperature
function controlTemperature(temp) {
    console.log(`Setting greenhouse temperature to ${temp}°C.`);
    event.controlTemperature(temp);
}

// Function to control greenhouse humidity
function controlHumidity(humidity) {
    console.log(`Setting greenhouse humidity to ${humidity}%.`);
    event.controlHumidity(humidity);
}

// Function to control greenhouse lighting
function controlLighting(state) {
    console.log(`Turning lights ${state} in the greenhouse.`);
    event.controlLighting(state);
}

// Function to check soil moisture levels
function checkSoilMoisture(zone) {
    let moistureLevel = event.getSoilMoisture(zone);
    console.log(`Soil moisture level in ${zone}: ${moistureLevel}%`);
    return moistureLevel;
}

// Function to water plants based on soil moisture levels
function waterPlants(zone) {
    let moistureLevel = checkSoilMoisture(zone);
    if (moistureLevel < 40) {
        console.log(`Soil moisture is low in ${zone}. Watering plants.`);
        event.waterPlants(zone);
    } else {
        console.log(`Soil moisture is sufficient in ${zone}. No watering needed.`);
    }
}

// Morning routine to prepare greenhouse environment
function morningGreenhouseRoutine() {
    if (event.morningGreenhouseRoutine) {
        controlTemperature(25);
        controlHumidity(60);
        controlLighting('on');
        waterPlants('zone1');
    }
}

// Afternoon routine to maintain optimal conditions
function afternoonGreenhouseRoutine() {
    if (event.afternoonGreenhouseRoutine) {
        controlTemperature(28);
        waterPlants('zone2');
    }
}

// Evening routine to shut down systems and prepare for the night
function eveningGreenhouseRoutine() {
    if (event.eveningGreenhouseRoutine) {
        controlTemperature(22);
        controlHumidity(70);
        controlLighting('off');
        waterPlants('zone3');
    }
}
//The morning routine ensures the greenhouse environment is set up for optimal plant growth by controlling temperature to 25°C, humidity to 60%, turning on the greenhouse lighting, and watering plants in zone 1 where soil moisture is monitored. In the afternoon, adjustments are made to maintain optimal conditions with the temperature increased to 28°C and additional watering of plants in zone 2 based on soil moisture levels. Evening routines focus on preparing the greenhouse for the night, including adjusting temperature to 22°C, increasing humidity to 70%, turning off the lighting, and watering plants in zone 3.
//The morning routine ensures the greenhouse environment is optimized for plant health by setting temperature, humidity, and lighting, and watering plants in zone 1 based on soil moisture levels. In the afternoon, adjustments are made to maintain optimal conditions and water plants in zone 2 as needed. Evening routines prepare the greenhouse for nighttime conditions, adjusting environmental factors and watering plants in zone 3.
//The greenhouse routines ensure optimal plant health throughout the day.