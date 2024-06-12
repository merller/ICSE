function startSmartManufacturingScene() {
    event.turnOnSecuritySystem(); 
    event.turnOnFactoryLights(); 
    event.startProductionLine(); 
    event.turnOnCoolingSystem(); 
    event.sendNotification('Smart Manufacturing Scene started.'); 
}
eventBus.on('materialLow', () => {
    event.sendNotification('Material stock is low!'); 
    event.orderMaterials(); 
});
eventBus.on('machineError', (machineId) => {
    event.stopMachine(machineId); 
    event.sendNotification(`Machine ${machineId} has encountered an error!`); 
    event.callMaintenanceTeam(); 
});
eventBus.on('productCompleted', (productId) => {
    event.packageProduct(productId); 
    event.sendNotification(`Product ${productId} has been completed and packaged.`); 
});
eventBus.on('highTemperatureDetected', () => {
    event.turnOnEmergencyCoolingSystem(); 
    event.sendNotification('High temperature detected! Emergency cooling system activated.'); 
});
startSmartManufacturingScene();
