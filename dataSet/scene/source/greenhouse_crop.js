// Function to control greenhouse temperature
function controlTemperature(zone, temp) {
    console.log(`Setting temperature in ${zone} to ${temp}°C.`);
    event.controlTemperature(zone, temp);
}

// Function to control greenhouse humidity
function controlHumidity(zone, humidity) {
    console.log(`Setting humidity in ${zone} to ${humidity}%.`);
    event.controlHumidity(zone, humidity);
}

// Function to enrich CO2 levels
function enrichCO2(zone, co2Level) {
    console.log(`Setting CO2 level in ${zone} to ${co2Level} ppm.`);
    event.enrichCO2(zone, co2Level);
}

// Function to monitor crop growth conditions
function monitorCropGrowth(zone) {
    let growthConditions = event.getCropGrowthConditions(zone);
    console.log(`Crop growth conditions in ${zone}: ${JSON.stringify(growthConditions)}`);
    return growthConditions;
}

// Function to alert greenhouse staff
function alertGreenhouseStaff(message) {
    console.log(`Alerting greenhouse staff: ${message}`);
    event.alertGreenhouseStaff(message);
}

// Morning routine for climate control and crop growth
function morningRoutine() {
    if (event.morningRoutine) {
        controlTemperature('zone1', 22);
        controlHumidity('zone1', 60);
        enrichCO2('zone1', 400);
        monitorCropGrowth('zone1');
        alertGreenhouseStaff('Morning climate control and crop growth optimization completed.');
    }
}

// Midday routine for climate control and crop growth
function middayRoutine() {
    if (event.middayRoutine) {
        controlTemperature('zone2', 24);
        controlHumidity('zone2', 55);
        enrichCO2('zone2', 450);
        monitorCropGrowth('zone2');
        alertGreenhouseStaff('Midday climate control and crop growth optimization completed.');
    }
}

// Evening routine for climate control and crop growth
function eveningRoutine() {
    if (event.eveningRoutine) {
        controlTemperature('zone3', 20);
        controlHumidity('zone3', 65);
        enrichCO2('zone3', 350);
        monitorCropGrowth('zone3');
        alertGreenhouseStaff('Evening climate control and crop growth optimization completed.');
    }
}
//When in morningRoutine, set the temperature in zone1 to 22°C, set the humidity in zone1 to 60%, enrich the CO2 level in zone1 to 400 ppm, monitor crop growth conditions in zone1, and alert the greenhouse staff that morning climate control and crop growth optimization are completed. When in middayRoutine, set the temperature in zone2 to 24°C, set the humidity in zone2 to 55%, enrich the CO2 level in zone2 to 450 ppm, monitor crop growth conditions in zone2, and alert the greenhouse staff that midday climate control and crop growth optimization are completed. When in eveningRoutine, set the temperature in zone3 to 20°C, set the humidity in zone3 to 65%, enrich the CO2 level in zone3 to 350 ppm, monitor crop growth conditions in zone3, and alert the greenhouse staff that evening climate control and crop growth optimization are completed.
//When in morningRoutine, manage temperature, humidity, CO2 levels, and crop growth conditions in zone1, and alert staff. When in middayRoutine, manage temperature, humidity, CO2 levels, and crop growth conditions in zone2, and alert staff. When in eveningRoutine, manage temperature, humidity, CO2 levels, and crop growth conditions in zone3, and alert staff.
//When in morningRoutine, optimize climate control and crop growth in zone1 and alert staff. When in middayRoutine, optimize climate control and crop growth in zone2 and alert staff. When in eveningRoutine, optimize climate control and crop growth in zone3 and alert staff.
