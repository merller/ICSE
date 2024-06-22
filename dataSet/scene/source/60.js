// Function to control classroom temperature
function controlClassroomTemperature(classroom, temp) {
    console.log(`Setting temperature in classroom ${classroom} to ${temp}°C.`);
    event.controlClassroomTemperature(classroom, temp);
}

// Function to adjust classroom lighting
function adjustClassroomLighting(classroom, state) {
    console.log(`Adjusting lighting in classroom ${classroom} to ${state}.`);
    event.adjustClassroomLighting(classroom, state);
}

// Function to monitor campus security cameras
function monitorCampusSecurity(camera) {
    let feed = event.getCampusSecurityFeed(camera);
    console.log(`Security feed from camera ${camera}: ${feed}`);
    return feed;
}

// Function to send campus-wide alert
function sendCampusAlert(message) {
    console.log(`Sending campus alert: ${message}`);
    event.sendCampusAlert(message);
}

// Function to manage energy usage
function manageEnergyUsage(building) {
    console.log(`Managing energy usage for ${building}.`);
    event.manageEnergyUsage(building);
}

// Morning routine for campus preparation
function morningCampusRoutine() {
    if (event.morningCampusRoutine) {
        controlClassroomTemperature('101', 22);
        adjustClassroomLighting('101', 'on');
        monitorCampusSecurity('main entrance');
        sendCampusAlert('Campus is now open.');
    }
}

// Midday routine for campus management
function middayCampusRoutine() {
    if (event.middayCampusRoutine) {
        adjustClassroomLighting('101', 'adjust to natural light');
        manageEnergyUsage('science building');
        monitorCampusSecurity('library');
    }
}

// Evening routine to secure the campus
function eveningCampusRoutine() {
    if (event.eveningCampusRoutine) {
        adjustClassroomLighting('101', 'off');
        controlClassroomTemperature('101', 18);
        monitorCampusSecurity('main entrance');
        sendCampusAlert('Campus is now closed.');
    }
}
