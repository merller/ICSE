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
//These routines involve detailed management of kitchen activities throughout the day. The morning routine checks fridge inventory for essential items like milk, suggests recipes based on available ingredients such as eggs and bacon, and preheats the oven for meal preparation. During lunchtime, meal preparation is managed based on available ingredients and suggested recipes, including preheating the oven. The evening routine focuses on cleaning up the kitchen, starting the dishwasher, and turning off the oven after use.
//Daily kitchen routines start with checking fridge inventory for essential items like milk and suggesting recipes based on available ingredients such as eggs and bacon in the morning. During lunch, meal preparation is managed with a focus on using available ingredients efficiently, including preheating the oven as needed. Evening routines involve cleaning up the kitchen, starting the dishwasher, and ensuring the oven is turned off after use.
//Kitchen routines involve checking inventory, suggesting recipes based on available ingredients, and managing meal preparation efficiently throughout the day. 