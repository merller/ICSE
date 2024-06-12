eventBus.on('foodInventoryUpdated', (item, quantity) => {
    event.sendNotification(`Inventory updated: ${item} - ${quantity} units.`); 
    event.checkFoodInventory(); 
    event.suggestRecipes(); 
});
eventBus.on('foodExpiringSoon', (item, daysLeft) => {
    event.sendNotification(`Food item ${item} is expiring in ${daysLeft} days.`); 
    event.suggestRecipesUsingItem(item); 
});
eventBus.on('foodOutOfStock', (item) => {
    event.sendNotification(`Food item ${item} is out of stock.`); 
    event.addToShoppingList(item); 
});
eventBus.on('shoppingListUpdated', (item, action) => {
    event.sendNotification(`Shopping list updated: ${item} has been ${action}.`); 
});
eventBus.on('foodWasteDetected', (item, quantity) => {
    event.sendNotification(`Food waste detected: ${item} - ${quantity} units wasted.`); 
    event.updateFoodWasteLog(item, quantity); 
    event.suggestWaysToReduceWaste(); 
});
function startSmartKitchenManagementScene() {
    event.turnOnSmartFridge(); 
    event.monitorFoodInventory(); 
    event.activateRecipeSuggestionSystem(); 
    event.sendNotification('Smart Kitchen Management Scene started.'); 
}
startSmartKitchenManagementScene();
