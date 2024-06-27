function startSafeHouseScene() {
    event.turnOnSecuritySystem();
    event.turnOnSurveillanceCameras();
    event.turnOnSmokeDetectors();
    event.sendNotification('Safe House Scene started.');
    smokeDetected();
    intrusionDetected();
}

function smokeDetected() {
    if (event.smokeDetected) {
        event.activateSmokeAlarm();
        event.sendNotification('Smoke detected! Evacuate immediately!');
        event.openAllDoors();
        event.openWindows();
        event.turnOnEmergencyLights();
        event.callEmergencyServices();
    }
}

function intrusionDetected() {
    if (event.intrusionDetected) {
        event.activateIntrusionAlarm();
        event.sendNotification('Intrusion detected! Security breach detected!');
        event.callSecurityServices();
    }
}

startSafeHouseScene();
