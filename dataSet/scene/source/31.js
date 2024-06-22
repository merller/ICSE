//When in the eveningRoutine. Turn on the lights. Adjust the brightness according to the time, when 6-18, set to 75, when 18-22, set to 50, when 22-6, set to 25. Set the color to warm white. When in the morningRoutine, turn on the lights, set the brightness to 100, and set the color to cool white.
//When in the eveningRoutine. Turn on the lights. Adjust the brightness according to the time, set the lights color. When in the morningRoutine, turn on the lights, set the brightness, and set the lights color.
//Adjust the brightness according to the time.


// Function to turn on the lights
function turnOnLights() {
    console.log("Turning on lights.");
    event.turnOnLights();
}

// Function to turn off the lights
function turnOffLights() {
    console.log("Turning off lights.");
    event.turnOffLights();
}

// Function to adjust the brightness of the lights
// Checks if the brightness level is between 0 and 100
function adjustBrightness(level) {
    if (level < 0 || level > 100) {
        console.log("Invalid brightness level. Must be between 0 and 100.");
        return;
    }
    console.log(`Setting light brightness to ${level}%.`);
    event.setLightBrightness(level);
}

// Function to change the color of the lights
// Validates if the chosen color is in the list of allowed colors
function setColor(color) {
    const validColors = ['red', 'green', 'blue', 'warm white', 'cool white'];
    if (!validColors.includes(color)) {
        console.log("Invalid color. Please choose from " + validColors.join(", ") + ".");
        return;
    }
    console.log(`Changing light color to ${color}.`);
    event.setLightColor(color);
}

// Function to dynamically adjust the brightness based on the time of day
// Brighter during the day, moderate in the evening, and dim at night
function dynamicBrightnessControl() {
    const currentHour = new Date().getHours();
    let brightness = 0;

    if (currentHour >= 6 && currentHour < 18) {
        brightness = 75; // Daytime brightness
    } else if (currentHour >= 18 && currentHour < 22) {
        brightness = 50; // Evening brightness
    } else {
        brightness = 25; // Night brightness
    }
    
    adjustBrightness(brightness);
}

// Evening routine that turns on lights, adjusts brightness, and sets color
function eveningRoutine() {
    if(event.eveningRoutine) {
        turnOnLights();
        dynamicBrightnessControl();
        setColor('warm white');
    }
}

// Morning routine that turns on lights and sets brightness to high
function morningRoutine() {
    if(event.morningRoutine) {
        turnOnLights();
        adjustBrightness(100);
        setColor('cool white');
    }
}
