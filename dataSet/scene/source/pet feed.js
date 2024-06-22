// Function to dispense food for the pet
function dispenseFood(amount) {
    console.log(`Dispensing ${amount} grams of food.`);
    event.dispenseFood(amount);
}

// Function to check the current food level in the feeder
function checkFoodLevel() {
    let foodLevel = event.getFoodLevel();
    console.log(`Current food level: ${foodLevel}%`);
    return foodLevel;
}

// Function to set a feeding schedule
function setFeedingSchedule(time) {
    console.log(`Setting feeding schedule to ${time}.`);
    event.setFeedingSchedule(time);
}

// Function to adjust feeding based on pet activity
function adjustFeeding(activityLevel) {
    let amount;
    if (activityLevel === 'high') {
        amount = 100; // grams
    } else if (activityLevel === 'moderate') {
        amount = 75; // grams
    } else {
        amount = 50; // grams
    }
    console.log(`Pet activity level is ${activityLevel}. Dispensing ${amount} grams of food.`);
    dispenseFood(amount);
}

// Morning routine to check food level and dispense food
function morningFeedingRoutine(activityLevel) {
    if(event.morningFeedingRoutine) {
        let foodLevel = checkFoodLevel();
        if (foodLevel < 20) {
            console.log("Food level is low. Refilling the feeder.");
            event.refillFeeder();
        }
        adjustFeeding(activityLevel);
    }
}

// Evening routine to set feeding schedule and check food level
function eveningFeedingRoutine(activityLevel) {
    if(event.eveningFeedingRoutine) {
        setFeedingSchedule('18:00');
        let foodLevel = checkFoodLevel();
        if (foodLevel < 20) {
            console.log("Food level is low. Refilling the feeder.");
            event.refillFeeder();
        }
        adjustFeeding(activityLevel);
    }
}
//When in the morningFeedingRoutine, the system checks the current food level in the feeder. If the food level is below 20%, it refills the feeder. Based on the pet's activity level, it dispenses 100 grams of food for high activity, 75 grams for moderate activity, or 50 grams for low activity. When in the eveningFeedingRoutine, the system sets the feeding schedule to 18:00, checks the food level, refills the feeder if the food level is below 20%, and adjusts the feeding amount based on the pet's activity level in the same way as in the morning.
//When in the morningFeedingRoutine, the system checks the food level, refills the feeder if necessary, and dispenses food based on the pet's activity level. When in the eveningFeedingRoutine, the system sets the feeding schedule, checks the food level, refills the feeder if necessary, and adjusts the feeding amount based on the pet's activity level.
//Checks and adjusts food levels and schedules feeding based on the pet's activity level in the morning and evening.
