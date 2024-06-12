function startSafeHouseScene() {
    event.turnOnSecuritySystem(); 
    event.turnOnSurveillanceCameras(); 
    event.turnOnSmokeDetectors(); 
    event.sendNotification('Safe House Scene started.'); 
    event.emit('smokeDetected');
    event.emit('intrusionDetected');
}
eventBus.on('smokeDetected', () => {
    event.activateSmokeAlarm(); 
    event.sendNotification('Smoke detected! Evacuate immediately!'); 
    event.openAllDoors(); 
    event.openWindows();
    event.turnOnEmergencyLights(); 
    event.callEmergencyServices(); 
});
eventBus.on('intrusionDetected', () => {
    event.activateIntrusionAlarm(); 
    event.sendNotification('Intrusion detected! Security breach detected!'); 
    event.callSecurityServices(); 
});
startSafeHouseScene();
