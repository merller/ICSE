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
