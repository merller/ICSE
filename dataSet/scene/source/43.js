
eventBus.on('bookBorrowed', (userId, bookId) => {
    event.sendNotification(`User ${userId} borrowed book ${bookId}.`); 
    event.updateInventory(bookId, 'borrowed'); 
    event.trackBorrowingHistory(userId, bookId); 
    event.recommendBooks(userId); 
});

eventBus.on('bookReturned', (userId, bookId) => {
    event.sendNotification(`User ${userId} returned book ${bookId}.`); 
    event.updateInventory(bookId, 'available'); 
    event.cleanAndSortBook(bookId); 
});

eventBus.on('userLoggedInEBookSystem', (userId) => {
    event.sendNotification(`User ${userId} logged into the eBook system.`); 
    event.recommendEBooks(userId); 
});

eventBus.on('lowInventoryDetected', (bookId) => {
    event.sendNotification(`Low inventory detected for book ${bookId}. Reordering.`); 
    event.reorderBook(bookId); 
});

eventBus.on('emergencyDetected', () => {
    event.sendNotification('Emergency detected! Initiating evacuation procedures.'); 
    event.activateEvacuationProtocol(); 
    event.guideUsersToExits(); 
});

eventBus.on('equipmentFailureDetected', (equipmentId) => {
    event.sendNotification(`Equipment failure detected: ${equipmentId}. Dispatching repair team.`); 
    event.dispatchRepairTeam(equipmentId); 
    event.activateBackupSystems(equipmentId); 
});

function startSmartLibraryScene() {
    event.turnOnSecuritySystem(); 
    event.activateAutoBorrowReturnSystem(); 
    event.turnOnEBookSystem(); 
    event.activateSmartRecommendationSystem(); 
    event.sendNotification('Smart Library Scene started.'); 
}

startSmartLibraryScene();
