// Function to monitor nutrient levels
function monitorNutrientLevels(zone) {
    let nutrientLevels = event.getNutrientLevels(zone);
    console.log(`Nutrient levels in ${zone}: ${JSON.stringify(nutrientLevels)}`);
    return nutrientLevels;
}

// Function to dose nutrients
function doseNutrients(zone, nutrient, amount) {
    console.log(`Dosing ${amount} of ${nutrient} in ${zone}.`);
    event.doseNutrients(zone, nutrient, amount);
}

// Function to monitor plant health
function monitorPlantHealth(zone) {
    let plantHealth = event.getPlantHealth(zone);
    console.log(`Plant health in ${zone}: ${JSON.stringify(plantHealth)}`);
    return plantHealth;
}

// Function to alert greenhouse staff
function alertGreenhouseStaff(message) {
    console.log(`Alerting greenhouse staff: ${message}`);
    event.alertGreenhouseStaff(message);
}

// Morning routine for nutrient delivery
function morningRoutine() {
    if (event.morningRoutine) {
        monitorNutrientLevels('zone1');
        doseNutrients('zone1', 'NPK', 50);
        monitorPlantHealth('zone1');
        alertGreenhouseStaff('Morning nutrient delivery completed.');
    }
}

// Midday routine for nutrient delivery
function middayRoutine() {
    if (event.middayRoutine) {
        monitorNutrientLevels('zone2');
        doseNutrients('zone2', 'NPK', 60);
        monitorPlantHealth('zone2');
        alertGreenhouseStaff('Midday nutrient delivery completed.');
    }
}

// Evening routine for nutrient delivery
function eveningRoutine() {
    if (event.eveningRoutine) {
        monitorNutrientLevels('zone3');
        doseNutrients('zone3', 'NPK', 40);
        monitorPlantHealth('zone3');
        alertGreenhouseStaff('Evening nutrient delivery completed.');
    }
}

//When in morningRoutine, monitor nutrient levels in zone1, dose 50 units of NPK nutrients, monitor plant health, and alert the greenhouse staff that morning nutrient delivery has been completed. When in middayRoutine, monitor nutrient levels in zone2, dose 60 units of NPK nutrients, monitor plant health, and alert the greenhouse staff that midday nutrient delivery has been completed. When in eveningRoutine, monitor nutrient levels in zone3, dose 40 units of NPK nutrients, monitor plant health, and alert the greenhouse staff that evening nutrient delivery has been completed.
//When in morningRoutine, manage nutrient delivery in zone1 by monitoring nutrient levels, dosing nutrients, monitoring plant health, and alerting staff. When in middayRoutine, manage nutrient delivery in zone2 by monitoring nutrient levels, dosing nutrients, monitoring plant health, and alerting staff. When in eveningRoutine, manage nutrient delivery in zone3 by monitoring nutrient levels, dosing nutrients, monitoring plant health, and alerting staff.
//When in morningRoutine, manage nutrient delivery and plant health monitoring in zone1, and alert staff. When in middayRoutine, manage nutrient delivery and plant health monitoring in zone2, and alert staff. When in eveningRoutine, manage nutrient delivery and plant health monitoring in zone3, and alert staff.
