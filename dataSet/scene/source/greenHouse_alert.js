// Function to control greenhouse temperature
function controlGreenhouseTemperature(zone, temp) {
    console.log(`Setting temperature in ${zone} to ${temp}°C.`);
    event.controlGreenhouseTemperature(zone, temp);
}

// Function to control greenhouse humidity
function controlGreenhouseHumidity(zone, humidity) {
    console.log(`Setting humidity in ${zone} to ${humidity}%.`);
    event.controlGreenhouseHumidity(zone, humidity);
}

// Function to monitor soil moisture
function monitorSoilMoisture(zone) {
    let moistureLevel = event.getSoilMoisture(zone);
    console.log(`Soil moisture level in ${zone}: ${moistureLevel}%`);
    return moistureLevel;
}

// Function to control greenhouse lighting
function controlGreenhouseLighting(zone, state) {
    console.log(`Setting lighting in ${zone} to ${state}.`);
    event.controlGreenhouseLighting(zone, state);
}

// Function to alert greenhouse staff
function alertGreenhouseStaff(message) {
    console.log(`Alerting greenhouse staff: ${message}`);
    event.alertGreenhouseStaff(message);
}

// Morning routine for greenhouse management
function morningRoutine() {
    if (event.morningRoutine) {
        controlGreenhouseTemperature('zone1', 22);
        controlGreenhouseHumidity('zone1', 60);
        monitorSoilMoisture('zone1');
        controlGreenhouseLighting('zone1', 'on');
        alertGreenhouseStaff('Morning operations started.');
    }
}

// Afternoon routine for greenhouse management
function afternoonRoutine() {
    if (event.afternoonRoutine) {
        controlGreenhouseTemperature('zone2', 24);
        controlGreenhouseHumidity('zone2', 65);
        monitorSoilMoisture('zone2');
        controlGreenhouseLighting('zone2', 'adjust to natural light');
        alertGreenhouseStaff('Afternoon operations ongoing.');
    }
}

// Night routine for greenhouse management
function nightRoutine() {
    if (event.nightRoutine) {
        controlGreenhouseTemperature('zone3', 18);
        controlGreenhouseHumidity('zone3', 70);
        monitorSoilMoisture('zone3');
        controlGreenhouseLighting('zone3', 'off');
        alertGreenhouseStaff('Night operations started.');
    }
}

//When in morningRoutine, set the temperature in zone1 to 22°C, set the humidity in zone1 to 60%, monitor the soil moisture in zone1, turn on the lighting in zone1, and alert the greenhouse staff that morning operations have started. When in afternoonRoutine, set the temperature in zone2 to 24°C, set the humidity in zone2 to 65%, monitor the soil moisture in zone2, adjust the lighting in zone2 to natural light, and alert the greenhouse staff that afternoon operations are ongoing. When in nightRoutine, set the temperature in zone3 to 18°C, set the humidity in zone3 to 70%, monitor the soil moisture in zone3, turn off the lighting in zone3, and alert the greenhouse staff that night operations have started.
//When in morningRoutine, manage temperature, humidity, soil moisture, and lighting in zone1, and alert staff. When in afternoonRoutine, manage temperature, humidity, soil moisture, and lighting in zone2, and alert staff. When in nightRoutine, manage temperature, humidity, soil moisture, and lighting in zone3, and alert staff.
//When in morningRoutine, manage greenhouse conditions and alert staff. When in afternoonRoutine, manage greenhouse conditions and alert staff. When in nightRoutine, manage greenhouse conditions and alert staff.
