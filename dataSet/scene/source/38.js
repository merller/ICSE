function startSmartAirportScene() {
    event.turnOnSecuritySystem(); 
    event.activateBaggageHandlingSystem(); 
    event.turnOnSmartSecurityCheck(); 
    event.activatePersonalizedNavigation(); 
    event.sendNotification('Smart Airport Scene started.'); 
}
eventBus.on('baggageScanAnomaly', (baggageId) => {
    event.sendNotification(`Baggage scan anomaly detected for baggage ID: ${baggageId}. Please check.`); 
    event.holdBaggage(baggageId); 
    event.alertSecurity(baggageId); 
});
eventBus.on('passengerApproachingSecurity', (passengerId) => {
    event.sendNotification(`Passenger ${passengerId} approaching security check.`); 
    event.prepareSecurityCheck(passengerId); 
});
eventBus.on('passengerClearedSecurity', (passengerId) => {
    event.sendNotification(`Passenger ${passengerId} cleared security.`); 
    event.provideNavigation(passengerId); 
});
eventBus.on('flightInfoUpdated', (flightId) => {
    event.sendNotification(`Flight information updated for flight ID: ${flightId}.`); 
    event.updateNavigation(flightId); 
});
eventBus.on('emergencyDetected', () => {
    event.sendNotification('Emergency detected! Initiating evacuation procedures.'); 
    event.activateEvacuationProtocol(); 
    event.guidePassengersToExits(); 
});
startSmartAirportScene();
