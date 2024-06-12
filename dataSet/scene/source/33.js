function startSmartInventoryManagementScene() {
    event.turnOnSecuritySystem(); 
    event.turnOnWarehouseLights(); 
    event.startInventoryTracking(); 
    event.sendNotification('Smart Inventory Management Scene started.'); 
}
eventBus.on('lowInventoryDetected', (itemId) => {
    event.sendNotification(`Low inventory detected for item ${itemId}.`); 
    event.orderStock(itemId); 
});
eventBus.on('newStockArrived', (itemId) => {
    event.updateInventory(itemId); 
    event.sendNotification(`New stock for item ${itemId} has arrived and inventory is updated.`); 
});
eventBus.on('inventoryErrorDetected', (itemId) => {
    event.sendNotification(`Inventory error detected for item ${itemId}.`); 
    event.auditInventory(itemId); 
});
eventBus.on('highTemperatureDetected', () => {
    event.turnOnCoolingSystem(); 
    event.sendNotification('High temperature detected in the warehouse. Cooling system activated.'); 
});
startSmartInventoryManagementScene();
