// Function to control room temperature
function controlRoomTemperature(room, temp) {
    console.log(`Setting temperature in room ${room} to ${temp}°C.`);
    event.controlRoomTemperature(room, temp);
}

// Function to handle guest check-in
function handleGuestCheckIn(guest) {
    console.log(`Checking in guest: ${guest}.`);
    event.handleGuestCheckIn(guest);
}

// Function to handle guest check-out
function handleGuestCheckOut(guest) {
    console.log(`Checking out guest: ${guest}.`);
    event.handleGuestCheckOut(guest);
}

// Function to send housekeeping notification
function sendHousekeepingNotification(room) {
    console.log(`Sending housekeeping notification for room ${room}.`);
    event.sendHousekeepingNotification(room);
}

// Morning routine for hotel management
function morningRoutine() {
    if (event.morningRoutine) {
        controlRoomTemperature('101', 22);
        handleGuestCheckIn('John Doe');
        sendHousekeepingNotification('102');
    }
}

// Evening routine for hotel management
function eveningRoutine() {
    if (event.eveningRoutine) {
        controlRoomTemperature('101', 20);
        handleGuestCheckOut('John Doe');
        sendHousekeepingNotification('101');
    }
}

//When in morningRoutine, set the temperature in room 101 to 22°C, check in guest John Doe, and send a housekeeping notification for room 102. When in eveningRoutine, set the temperature in room 101 to 20°C, check out guest John Doe, and send a housekeeping notification for room 101.
//When in morningRoutine, set room temperature, check in a guest, and send a housekeeping notification. When in eveningRoutine, set room temperature, check out a guest, and send a housekeeping notification.
//When in morningRoutine, manage room temperature, guest check-in, and housekeeping. When in eveningRoutine, manage room temperature, guest check-out, and housekeeping.
