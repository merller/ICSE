// Function to lock or unlock doors  1
function controlDoorLock(door, state) {
    console.log(`${state} the ${door} door.`);
    event.controlDoorLock(door, state);
}

// Function to check security camera feed  2
function checkCameraFeed(camera) {
    let feed = event.getCameraFeed(camera);
    console.log(`Security camera feed from ${camera}: ${feed}`);
    return feed;
}

// Function to detect motion  3
function detectMotion(zone) {
    let motion = event.detectMotion(zone);
    console.log(`Motion detected in ${zone}: ${motion}`);
    return motion;
}

// Function to activate security alarm  4
function activateAlarm() {
    console.log("Activating security alarm.");
    event.activateAlarm();
}

// Function to deactivate security alarm  5
function deactivateAlarm() {
    console.log("Deactivating security alarm.");
    event.deactivateAlarm();
}

// Function to adjust lighting based on security needs  6
function adjustSecurityLighting(zone, state) {
    console.log(`${state} security lighting in ${zone}.`);
    event.adjustSecurityLighting(zone, state);
}

// Night routine to secure the house  7
function nightSecurityRoutine() {
    if (event.nightSecurityRoutine) {
        controlDoorLock('front', 'lock');
        controlDoorLock('back', 'lock');
        adjustSecurityLighting('perimeter', 'on');
        activateAlarm();
    }
}

// Morning routine to prepare for the day  8
function morningSecurityRoutine() {
    if (event.morningSecurityRoutine) {
        controlDoorLock('front', 'unlock');
        controlDoorLock('back', 'unlock');
        adjustSecurityLighting('perimeter', 'off');
        deactivateAlarm();
    }
}

// Emergency routine to respond to detected motion  9
function emergencySecurityRoutine() {
    if (event.emergencySecurityRoutine) {
        let motion = detectMotion('living room');
        if (motion) {
            activateAlarm();
            checkCameraFeed('living room');
        }
    }
}
//The night security routine includes locking both the front and back doors, activating perimeter security lighting, and activating the security alarm system to ensure comprehensive protection. In the morning, the routine involves unlocking the front and back doors, turning off perimeter security lighting, and deactivating the security alarm system. During emergencies, such as detecting motion in the living room, the alarm is promptly activated, and the security camera feed is checked to assess the situation.
//Daily security routines involve securing the home at night by locking doors, activating perimeter lighting, and setting the alarm. Mornings focus on unlocking doors, turning off perimeter lighting, and disabling the alarm. In emergencies, responses include activating the alarm and checking camera feeds to ensure security measures are effective.
//home security routines include securing the house at night, preparing for the day in the morning, and responding to emergencies like motion detection in the living room.