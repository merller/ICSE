// Function to set the HVAC temperature
function setHVACTemperature(temp) {
    console.log(`Setting HVAC temperature to ${temp}°C.`);
    event.setHVACTemperature(temp);
}

// Function to control the fan speed
function setFanSpeed(speed) {
    console.log(`Setting fan speed to ${speed}.`);
    event.setFanSpeed(speed);
}

// Function to check the current room temperature
function checkRoomTemperature() {
    let temperature = event.getRoomTemperature();
    console.log(`Current room temperature: ${temperature}°C`);
    return temperature;
}

// Function to adjust the HVAC system based on room temperature and outside weather
function adaptiveHVACControl(outsideTemp) {
    let roomTemp = checkRoomTemperature();
    if (roomTemp < 20) {
        console.log("Room is cold. Switching to heating mode.");
        event.switchToHeating();
    } else if (roomTemp > 25) {
        console.log("Room is hot. Switching to cooling mode.");
        event.switchToCooling();
    } else {
        console.log("Room temperature is comfortable. Maintaining current mode.");
    }
}

// Routine to optimize HVAC settings in the morning based on outside temperature
function morningHVACRoutine(outsideTemp) {
    if(event.morningHVACRoutine) {
        adaptiveHVACControl(outsideTemp);
        setHVACTemperature(22);
        setFanSpeed(3);
    }
}

// Routine to optimize HVAC settings in the evening for energy saving
function eveningHVACRoutine(outsideTemp) {
    if(event.eveningHVACRoutine) {
        adaptiveHVACControl(outsideTemp);
        setHVACTemperature(20);
        setFanSpeed(2);
    }
}

// Night routine to ensure HVAC is set to a comfortable sleep temperature
function nightHVACRoutine() {
    if(event.nightHVACRoutine) {
        setHVACTemperature(18);
        setFanSpeed(1);
    }
}
//When in the morningHVACRoutine, the system checks the current room temperature and adjusts the HVAC mode based on both the room and outside temperatures. If the room temperature is below 20°C, it switches to heating mode, and if it is above 25°C, it switches to cooling mode. The HVAC temperature is set to 22°C and the fan speed to 3. When in the eveningHVACRoutine, the system performs a similar check and adjustment based on the outside temperature, sets the HVAC temperature to 20°C, and the fan speed to 2. When in the nightHVACRoutine, the system sets the HVAC temperature to 18°C and the fan speed to 1 for comfortable sleep.
//When in the morningHVACRoutine, the system checks and adjusts the HVAC mode based on temperatures, sets the temperature to 22°C, and the fan speed to 3. When in the eveningHVACRoutine, the system adjusts the HVAC mode based on the outside temperature, sets the temperature to 20°C, and the fan speed to 2. When in the nightHVACRoutine, it sets the temperature to 18°C and the fan speed to 1.
//Optimizes HVAC settings by adjusting modes based on temperatures, and sets temperature and fan speed for morning, evening, and night routines.