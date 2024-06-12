function startSmartHospitalScene() {
    event.turnOnSecuritySystem(); 
    event.activateBedManagementSystem(); 
    event.turnOnMedicationDispensingRobots(); 
    event.activateSurgicalDevices(); 
    event.sendNotification('Smart Hospital Scene started.'); 
}
eventBus.on('bedAvailable', (bedId) => {
    event.sendNotification(`Bed ${bedId} is now available.`); 
    event.updateBedStatus(bedId, 'available'); 
});
eventBus.on('medicationNeedsDispensing', (patientId, medication) => {
    event.sendNotification(`Dispensing medication for patient ${patientId}.`); 
    event.dispenseMedication(patientId, medication); 
    event.updateMedicationRecord(patientId, medication); 
});
eventBus.on('surgeryStarting', (surgeryId) => {
    event.sendNotification(`Surgery ${surgeryId} is about to start.`); 
    event.prepareSurgicalDevices(surgeryId); 
    event.notifySurgicalTeam(surgeryId); 
});
eventBus.on('surgeryCompleted', (surgeryId) => {
    event.sendNotification(`Surgery ${surgeryId} has been completed.`); 
    event.updateSurgicalRecord(surgeryId); 
    event.cleanSurgicalDevices(surgeryId); 
});
eventBus.on('emergencyDetected', () => {
    event.sendNotification('Emergency detected! Initiating emergency protocol.'); 
    event.activateEmergencyProtocol(); 
    event.alertEmergencyResponseTeam(); 
});
startSmartHospitalScene();
