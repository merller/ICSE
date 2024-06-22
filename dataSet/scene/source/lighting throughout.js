// Function to set the brightness of the lights
function setBrightness(level) {
    console.log(`Setting brightness to ${level}%.`);
    event.setBrightness(level);
}

// Function to set the color temperature of the lights
function setColorTemperature(temp) {
    console.log(`Setting color temperature to ${temp}K.`);
    event.setColorTemperature(temp);
}

// Function to turn the lights on
function turnLightsOn() {
    console.log("Turning lights on.");
    event.turnLightsOn();
}

// Function to turn the lights off
function turnLightsOff() {
    console.log("Turning lights off.");
    event.turnLightsOff();
}

// Function to adjust lights based on motion detection
function adjustLightsOnMotion(detected) {
    if (detected) {
        console.log("Motion detected. Turning lights on.");
        turnLightsOn();
    } else {
        console.log("No motion detected. Turning lights off.");
        turnLightsOff();
    }
}

// Morning routine to set the lights for the start of the day
function morningLightingRoutine() {
    if (event.morningLightingRoutine) {
        turnLightsOn();
        setBrightness(75);
        setColorTemperature(4000);
    }
}

// Evening routine to set the lights for winding down
function eveningLightingRoutine() {
    if (event.eveningLightingRoutine) {
        setBrightness(50);
        setColorTemperature(2700);
    }
}

// Night routine to turn off lights and enable motion detection
function nightLightingRoutine() {
    if (event.nightLightingRoutine) {
        turnLightsOff();
        adjustLightsOnMotion(event.detectMotion());
    }
}
//When in morningLightingRoutine, turns on the lights, sets the brightness to 75%, and adjusts the color temperature to 4000K to create a bright and energetic environment for starting the day. The eveningLightingRoutine sets the brightness to 50% and adjusts the color temperature to 2700K for a warm and relaxing ambiance to wind down the day. When in nightLightingRoutine, turns off the lights and enables motion detection. If motion is detected, the lights turn on; otherwise, they remain off.
//When in morningLightingRoutine, sets up the lighting for the start of the day by turning on the lights, increasing the brightness, and setting a cool color temperature. When in eveningLightingRoutine, adjusts the lights for the evening by reducing the brightness and setting a warm color temperature. The nightLightingRoutine turns off the lights and activates motion detection to automatically control the lights based on movement.
//Adjusts the lighting throughout the day, turning on lights in the morning, dimming them in the evening, and using motion detection to control lights at night.