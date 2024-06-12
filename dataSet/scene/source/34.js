function startSmartMuseumScene() {
    event.turnOnSecuritySystem(); 
    event.turnOnExhibitLights(); 
    event.setAmbientTemperature(22); 
    event.startVisitorTracking(); 
    event.sendNotification('Smart Museum Scene started.');

}
eventBus.on('visitorEntered', (visitorId) => {
    event.sendNotification(`Visitor ${visitorId} has entered the exhibit area.`); 
    event.playWelcomeMessage(visitorId); 
    event.adjustLightingForVisitor(visitorId); 
});
eventBus.on('exhibitTouched', (exhibitId) => {
    event.sendNotification(`Exhibit ${exhibitId} has been touched.`); 
    event.activateExhibitAlarm(exhibitId); 
});
eventBus.on('overcrowdingDetected', () => {
    event.sendNotification('Overcrowding detected in the exhibit area.'); 
    event.redirectVisitors(); 
});
eventBus.on('fireDetected', () => {
    event.sendNotification('Fire detected! Evacuate the museum immediately.'); 
    event.activateFireAlarm(); 
    event.openEmergencyExits(); 
});
eventBus.on('visitorExited', (visitorId) => {
    event.sendNotification(`Visitor ${visitorId} has left the exhibit area.`); 
});
startSmartMuseumScene();
