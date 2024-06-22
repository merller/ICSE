// Function to book a meeting room
function bookMeetingRoom(room, time) {
    console.log(`Booking ${room} for ${time}.`);
    event.bookMeetingRoom(room, time);
}

// Function to adjust office lighting based on occupancy
function adjustOfficeLighting(occupancy) {
    if (occupancy > 0) {
        console.log("Office occupied. Turning lights on.");
        event.setOfficeLighting('on');
    } else {
        console.log("Office empty. Turning lights off.");
        event.setOfficeLighting('off');
    }
}

// Function to set HVAC temperature based on time of day
function setHVACTemperature(time) {
    let temp = time < '12:00' ? 22 : 24; // Cooler in the morning, warmer in the afternoon
    console.log(`Setting HVAC temperature to ${temp}°C.`);
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
    adjustOfficeLighting(occupancy);
    setHVACTemperature(time);
}

// Morning routine to prepare the office for the day
function morningOfficeRoutine() {
    if (event.morningOfficeRoutine) {
        bookMeetingRoom('Conference Room', '09:00');
        manageEnergyUsage();
    }
}

// Afternoon routine to optimize energy usage and comfort
function afternoonOfficeRoutine() {
    if (event.afternoonOfficeRoutine) {
        manageEnergyUsage();
        bookMeetingRoom('Conference Room', '14:00');
    }
}

// Evening routine to shut down non-essential systems and save energy
function eveningOfficeRoutine() {
    if (event.eveningOfficeRoutine) {
        adjustOfficeLighting(0); // Assume office is empty
        setHVACTemperature('18:00');
        event.shutDownNonEssentialSystems();
    }
}
//The office routines manage daily operations efficiently, including booking meeting rooms and optimizing energy usage based on occupancy. The morning routine ensures the office is ready for the day by scheduling meetings and adjusting lighting and HVAC as needed. In the afternoon, energy efficiency remains a priority with continued adjustments based on occupancy levels, ensuring comfort while conserving energy. The evening routine focuses on preparing the office for shutdown by adjusting environmental settings and powering down non-essential systems.
//Office routines streamline daily operations, from managing meeting room bookings to optimizing energy usage based on occupancy. In the morning, preparations ensure the office is set for the day ahead, while the afternoon maintains comfort and efficiency through adaptive environmental adjustments. By evening, the focus shifts to energy conservation by fine-tuning environmental controls and deactivating non-essential systems.
//The office routines efficiently manage operations throughout the day, optimizing energy use and ensuring comfort.