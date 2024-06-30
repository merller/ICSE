// Function to monitor soil moisture
function monitorSoilMoisture(zone) {
    let moistureLevel = event.getSoilMoisture(zone);
    console.log(`Soil moisture level in ${zone}: ${moistureLevel}%`);
    return moistureLevel;
}

// Function to schedule irrigation
function scheduleIrrigation(zone, duration) {
    console.log(`Scheduling irrigation in ${zone} for ${duration} minutes.`);
    event.scheduleIrrigation(zone, duration);
}

// Function to track water usage
function trackWaterUsage(zone) {
    let waterUsage = event.getWaterUsage(zone);
    console.log(`Water usage in ${zone}: ${waterUsage} liters`);
    return waterUsage;
}

// Function to alert greenhouse staff
function alertGreenhouseStaff(message) {
    console.log(`Alerting greenhouse staff: ${message}`);
    event.alertGreenhouseStaff(message);
}

// Morning routine for irrigation management
function morningRoutine() {
    if (event.morningRoutine) {
        let moistureLevel = monitorSoilMoisture('zone1');
        if (moistureLevel < 30) {
            scheduleIrrigation('zone1', 15);
        }
        trackWaterUsage('zone1');
        alertGreenhouseStaff('Morning irrigation completed.');
    }
}

// Midday routine for irrigation management
function middayRoutine() {
    if (event.middayRoutine) {
        let moistureLevel = monitorSoilMoisture('zone2');
        if (moistureLevel < 40) {
            scheduleIrrigation('zone2', 20);
        }
        trackWaterUsage('zone2');
        alertGreenhouseStaff('Midday irrigation completed.');
    }
}

// Evening routine for irrigation management
function eveningRoutine() {
    if (event.eveningRoutine) {
        let moistureLevel = monitorSoilMoisture('zone3');
        if (moistureLevel < 35) {
            scheduleIrrigation('zone3', 25);
        }
        trackWaterUsage('zone3');
        alertGreenhouseStaff('Evening irrigation completed.');
    }
}

//When in morningRoutine, monitor the soil moisture level in zone1. If the moisture level is below 30%, schedule irrigation for 15 minutes. Track the water usage in zone1 and alert the greenhouse staff that morning irrigation has been completed. When in middayRoutine, monitor the soil moisture level in zone2. If the moisture level is below 40%, schedule irrigation for 20 minutes. Track the water usage in zone2 and alert the greenhouse staff that midday irrigation has been completed. When in eveningRoutine, monitor the soil moisture level in zone3. If the moisture level is below 35%, schedule irrigation for 25 minutes. Track the water usage in zone3 and alert the greenhouse staff that evening irrigation has been completed.
//When in morningRoutine, manage irrigation in zone1 based on soil moisture levels, track water usage, and alert staff. When in middayRoutine, manage irrigation in zone2 based on soil moisture levels, track water usage, and alert staff. When in eveningRoutine, manage irrigation in zone3 based on soil moisture levels, track water usage, and alert staff.
//When in morningRoutine, manage irrigation and water usage in zone1, and alert staff. When in middayRoutine, manage irrigation and water usage in zone2, and alert staff. When in eveningRoutine, manage irrigation and water usage in zone3, and alert staff.