// Function to arm the security system
function armSystem() {
    console.log("Arming the security system.");
    event.armSystem();
}

// Function to disarm the security system
function disarmSystem() {
    console.log("Disarming the security system.");
    event.disarmSystem();
}

// Function to check the status of a specific sensor
function checkSensorStatus(sensor) {
    let status = event.getSensorStatus(sensor);
    console.log(`Status of ${sensor} sensor: ${status}`);
    return status;
}

// Function to activate the alarm
function activateAlarm() {
    console.log("Activating the alarm.");
    event.activateAlarm();
}

// Function to check the status of multiple sensors and activate the alarm if any are triggered
function comprehensiveSensorCheck() {
    const sensors = ['door', 'window', 'motion'];
    for (let sensor of sensors) {
        let status = checkSensorStatus(sensor);
        if (status === 'triggered') {
            activateAlarm();
            break;
        }
    }
}

// Night routine that arms the system and checks all sensors
function nightRoutine() {
    if(event.nightRoutine) {
        armSystem();
        comprehensiveSensorCheck();
    }
}

// Away routine that arms the system and sets an alert if any sensor is triggered
function awayRoutine() {
    if(event.awayRoutine) {
        armSystem();
        if (comprehensiveSensorCheck()) {
            activateAlarm();
        }
    }
}

//When in the nightRoutine, the system arms and checks the status of all sensors (door, window, motion). If any sensor is triggered, the alarm activates. When in the awayRoutine, the system arms and checks the status of all sensors. If any sensor is triggered, the alarm activates.
//When in the nightRoutine, the system arms and checks all sensors, activating the alarm if any are triggered. When in the awayRoutine, the system arms and sets an alert if any sensor is triggered.
//Arms the system and checks the status of sensors, activating the alarm if any are triggered.
