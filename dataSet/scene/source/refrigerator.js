// Function to set the refrigerator temperature
function setFridgeTemperature(temp) {
    console.log(`Setting refrigerator temperature to ${temp}°C.`);
    event.setFridgeTemperature(temp);
}

// Function to set the freezer temperature
function setFreezerTemperature(temp) {
    console.log(`Setting freezer temperature to ${temp}°C.`);
    event.setFreezerTemperature(temp);
}

// Function to check if a specific item is in the refrigerator
function checkInventory(item) {
    let isInStock = event.isItemInStock(item);
    console.log(`${item} is ${isInStock ? 'in stock' : 'not in stock'} in the refrigerator.`);
    return isInStock;
}

// Function to add an item to the shopping list if it's out of stock
function addToShoppingList(item) {
    if (!checkInventory(item)) {
        console.log(`Adding ${item} to the shopping list.`);
        event.addToShoppingList(item);
    }
}

// Function to check the overall inventory and restock critical items
function restockInventory() {
    const criticalItems = ['milk', 'eggs', 'butter'];
    criticalItems.forEach(item => addToShoppingList(item));
}

// Morning routine to set ideal temperatures and check for breakfast items
function morningFridgeRoutine() {
    if(event.morningFridgeRoutine) {
        setFridgeTemperature(4);
        setFreezerTemperature(-18);
        checkInventory('milk');
        checkInventory('eggs');
    }
}

// Evening routine to restock critical items and set night temperatures
function eveningFridgeRoutine() {
    if(event.eveningFridgeRoutine) {
        restockInventory();
        setFridgeTemperature(5);
        setFreezerTemperature(-17);
    }
}
//When in the morningFridgeRoutine, the system sets the refrigerator temperature to 4°C and the freezer temperature to -18°C. It also checks if milk and eggs are in stock. When in the eveningFridgeRoutine, the system restocks critical items (milk, eggs, butter) and sets the refrigerator temperature to 5°C and the freezer temperature to -17°C. Additionally, the system can add items to the shopping list if they are out of stock.
//When in the morningFridgeRoutine, the system sets the temperatures and checks for specific items. When in the eveningFridgeRoutine, the system restocks critical items and sets the temperatures. The system also adds out-of-stock items to the shopping list.
//Manages the refrigerator and freezer temperatures, checks for specific items, and restocks critical items.
