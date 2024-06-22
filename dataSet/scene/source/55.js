// Function to adjust office lighting based on occupancy
function adjustOfficeLighting(occupancy, brightness) {
    if (occupancy > 0) {
        console.log(`Office occupied. Setting lights to ${brightness}%.`);
        event.setOfficeLighting('on', brightness);
    } else {
        console.log("Office empty. Turning lights off.");
        event.setOfficeLighting('off', 0);
    }
}

// Function to set HVAC temperature based on time of day
function setHVACTemperature(time, temp) {
    console.log(`Setting HVAC temperature to ${temp}°C at ${time}.`);
    event.setHVACTemperature(temp);
}

// Function to check room occupancy
function checkRoomOccupancy() {
    let occupancy = event.getRoomOccupancy();
    console.log(`Room occupancy: ${occupancy}`);
    return occupancy;
}

// Function to manage energy usage based on room occupancy and time of day
function manageEnergyUsage() {
    let occupancy = checkRoomOccupancy();
    let time = new Date().toTimeString().split(' ')[0];
    let brightness = occupancy > 0 ? 70 : 0;
    adjustOfficeLighting(occupancy, brightness);
    setHVACTemperature(time, time < '12:00' ? 22 : 24);
}

// Morning routine to prepare the office for the day
function morningOfficeRoutine() {
    if (event.morningOfficeRoutine) {
        manageEnergyUsage();
    }
}

// Afternoon routine to optimize energy usage and comfort
function afternoonOfficeRoutine() {
    if (event.afternoonOfficeRoutine) {
        manageEnergyUsage();
    }
}

// Evening routine to shut down non-essential systems and save energy
function eveningOfficeRoutine() {
    if (event.eveningOfficeRoutine) {
        adjustOfficeLighting(0, 0); // Assume office is empty
        setHVACTemperature('18:00', 20);
        event.shutDownNonEssentialSystems();
    }
}
