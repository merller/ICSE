// Function to brew coffee
function brewCoffee(type) {
    console.log(`Brewing ${type} coffee.`);
    event.brewCoffee(type);
}

// Function to set a brewing schedule
function setBrewingSchedule(time) {
    console.log(`Setting brewing schedule to ${time}.`);
    event.setBrewingSchedule(time);
}

// Function to check coffee bean level
function checkBeanLevel() {
    let level = event.getBeanLevel();
    console.log(`Coffee bean level: ${level}%`);
    return level;
}

// Function to refill coffee beans if the level is low
function refillBeans() {
    if (checkBeanLevel() < 20) {
        console.log("Refilling coffee beans.");
        event.refillBeans();
    } else {
        console.log("Coffee beans are sufficient.");
    }
}

// Morning routine to brew coffee and check bean level
function morningCoffeeRoutine() {
    if (event.morningCoffeeRoutine) {
        brewCoffee('espresso');
        refillBeans();
        setBrewingSchedule('07:00');
    }
}

// Afternoon routine to brew coffee and check bean level
function afternoonCoffeeRoutine() {
    if (event.afternoonCoffeeRoutine) {
        brewCoffee('latte');
        refillBeans();
        setBrewingSchedule('15:00');
    }
}

// Evening routine to clean the coffee machine
function eveningCoffeeRoutine() {
    if (event.eveningCoffeeRoutine) {
        console.log("Cleaning the coffee machine.");
        event.cleanMachine();
    }
}
//The morningCoffeeRoutine starts by brewing an espresso, checks the coffee bean level, refills the beans if necessary, and sets the brewing schedule to 07:00. The afternoonCoffeeRoutine brews a latte, checks and refills the bean level if needed, and sets the brewing schedule to 15:00. The eveningCoffeeRoutine focuses on cleaning the coffee machine to ensure it is ready for the next day.
//The morningCoffeeRoutine brews coffee in the morning, refills beans if they are low, and schedules the next brewing time. The afternoonCoffeeRoutine brews coffee in the afternoon, checks and refills beans, and sets the brewing schedule. The eveningCoffeeRoutine cleans the coffee machine to maintain it.
//Automates coffee brewing routines by setting schedules, maintaining bean levels, and ensuring the machine is clean for use throughout the day.
