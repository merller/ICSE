// Function to check fridge inventory
function checkFridgeInventory(item) {
    let inventory = event.getFridgeInventory(item);
    console.log(`Inventory level for ${item}: ${inventory}`);
    return inventory;
}

// Function to suggest a recipe based on available ingredients
function suggestRecipe(ingredients) {
    let recipe = event.getRecipeSuggestion(ingredients);
    console.log(`Suggested recipe: ${recipe}`);
    return recipe;
}

// Function to control the oven
function controlOven(state, temp) {
    console.log(`${state} the oven at ${temp}°C.`);
    event.controlOven(state, temp);
}

// Function to control the dishwasher
function controlDishwasher(state) {
    console.log(`${state} the dishwasher.`);
    event.controlDishwasher(state);
}

// Function to manage meal preparation based on inventory and recipes
function manageMealPreparation() {
    let ingredients = ['chicken', 'rice', 'vegetables'];
    let recipe = suggestRecipe(ingredients);
    if (recipe) {
        controlOven('preheat', 180);
        console.log(`Preparing ingredients for ${recipe}.`);
    } else {
        console.log("No recipe suggestions available.");
    }
}

// Morning routine to check inventory and plan breakfast
function morningKitchenRoutine() {
    if (event.morningKitchenRoutine) {
        checkFridgeInventory('milk');
        suggestRecipe(['eggs', 'bacon']);
        controlOven('preheat', 180);
    }
}

// Lunch routine to prepare a midday meal
function lunchKitchenRoutine() {
    if (event.lunchKitchenRoutine) {
        manageMealPreparation();
    }
}

// Evening routine to clean up the kitchen
function eveningKitchenRoutine() {
    if (event.eveningKitchenRoutine) {
        controlDishwasher('start');
        controlOven('off', 0);
    }
}
//When in morningKitchenRoutine, check the inventory level of milk, suggest a recipe using eggs and bacon, and preheat the oven to 180°C. When in lunchKitchenRoutine, suggest a recipe using chicken, rice, and vegetables, and preheat the oven to 180°C. When in eveningKitchenRoutine, start the dishwasher and turn off the oven.
//When in morningKitchenRoutine, check the fridge inventory, suggest a breakfast recipe, and preheat the oven. When in lunchKitchenRoutine, manage meal preparation based on available ingredients and preheat the oven. When in eveningKitchenRoutine, start the dishwasher and turn off the oven.
//When in morningKitchenRoutine, check inventory, suggest a recipe, and preheat the oven. When in lunchKitchenRoutine, manage meal preparation and preheat the oven. When in eveningKitchenRoutine, clean up the kitchen.