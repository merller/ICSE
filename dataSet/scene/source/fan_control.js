// Function to start the fan
function startFan() {
    console.log("Starting fan.");
    event.startFan();
}

// Function to stop the fan
function stopFan() {
    console.log("Stopping fan.");
    event.stopFan();
}

// Function to adjust the speed of the fan
// Checks if the speed level is between 0 and 100
function adjustFanSpeed(level) {
    if (level < 0 || level > 100) {
        console.log("Invalid speed level. Must be between 0 and 100.");
        return;
    }
    console.log(`Setting fan speed to ${level}%.`);
    event.setFanSpeed(level);
}

// Function to set the mode of the fan
// Validates if the chosen mode is in the list of allowed modes
function setFanMode(mode) {
    const validModes = ['normal', 'natural', 'sleep', 'turbo'];
    if (!validModes.includes(mode)) {
        console.log("Invalid mode. Please choose from " + validModes.join(", ") + ".");
        return;
    }
    console.log(`Changing fan mode to ${mode}.`);
    event.setFanMode(mode);
}

// Function to dynamically adjust the fan speed based on the temperature
// Faster speed for higher temperatures, moderate for comfortable temperatures, and slower for lower temperatures
function dynamicSpeedControl(temperature) {
    let speed = 0;

    if (temperature >= 30) {
        speed = 100; // Hot temperature speed
    } else if (temperature >= 20 && temperature < 30) {
        speed = 75; // Comfortable temperature speed
    } else {
        speed = 50; // Cool temperature speed
    }
    
    adjustFanSpeed(speed);
}

// Hot day routine that starts the fan, adjusts speed, and sets mode
function hotDayRoutine() {
    if(event.hotDayRoutine) {
        startFan();
        dynamicSpeedControl(35); // Example temperature for hot day
        setFanMode('turbo');
    }
}

// Normal day routine that starts the fan and sets speed to moderate
function normalDayRoutine() {
    if(event.normalDayRoutine) {
        startFan();
        adjustFanSpeed(75);
        setFanMode('normal');
    }
}

//When in the hotDayRoutine, start the fan. Adjust the speed according to the temperature, when temperature is above 30, set the speed to 100, when temperature is between 20-30, set the speed to 75, when temperature is below 20, set the speed to 50. Set the mode to turbo. When in the normalDayRoutine, start the fan, set the speed to 75, and set the mode to normal.
//When in the hotDayRoutine, start the fan. Adjust the speed according to the temperature, and set the fan mode. When in the normalDayRoutine, start the fan, set the speed, and set the fan mode.
//Adjust the speed according to the temperature.