eventBus.on('vehicleBooked', (userId, vehicleId, bookingTime) => {
    event.sendNotification(`User ${userId} booked vehicle ${vehicleId} for ${bookingTime}.`); 
    event.reserveVehicle(vehicleId, userId); 
    event.sendBookingConfirmation(userId, vehicleId); 
});
eventBus.on('vehicleUnlocked', (userId, vehicleId) => {
    event.sendNotification(`User ${userId} unlocked vehicle ${vehicleId}.`); 
    event.startTripTracking(userId, vehicleId); 
    event.updateVehicleStatus(vehicleId, 'in use'); 
});
eventBus.on('tripEnded', (userId, vehicleId) => {
    event.sendNotification(`User ${userId} ended trip with vehicle ${vehicleId}.`); 
    event.stopTripTracking(userId, vehicleId); 
    event.updateVehicleStatus(vehicleId, 'available'); 
    event.calculateTripCost(userId, vehicleId); 
    event.sendInvoice(userId); 
});
eventBus.on('vehicleFailureDetected', (vehicleId) => {
    event.sendNotification(`Vehicle ${vehicleId} failure detected. Dispatching repair team.`); 
    event.dispatchRepairTeam(vehicleId); 
    event.updateVehicleStatus(vehicleId, 'out of service'); 
});
eventBus.on('vehicleNeedsCleaning', (vehicleId) => {
    event.sendNotification(`Vehicle ${vehicleId} needs cleaning.`); 
    event.dispatchCleaningTeam(vehicleId); 
    event.updateVehicleStatus(vehicleId, 'cleaning'); 
});
function startSmartCarSharingScene() {
    event.turnOnCarSharingSystem(); 
    event.activateVehicleFleet(); 
    event.setUpMobileAppIntegration(); 
    event.sendNotification('Smart Car Sharing Scene started.'); 
}
startSmartCarSharingScene();
