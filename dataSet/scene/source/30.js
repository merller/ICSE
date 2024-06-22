
//when starts the morningBakingRoutine, we choose to bake a cake. we preheat the oven to 180, we set cooking timer to 30 minutes. when starts the eveningBakingRoutine, we choose to bake a pizza. we preheat the oven to 220. we set cooking timer to 15 minutes.
//We choose to bake a cake in the morning. We preheat the oven. We set the cooking timer. We choose to bake a pizza in the evening. We preheat the oven. We set the cooking timer. 
//Bake a cake in the morning. Bake a pizza in the evening.
// Function to set the oven temperature
function setOvenTemperature(temp) {
    console.log(`Setting oven temperature to ${temp}°C.`);
    event.setOvenTemperature(temp);
}

// Function to set a cooking timer
function setCookingTimer(minutes) {
    console.log(`Setting cooking timer for ${minutes} minutes.`);
    event.setCookingTimer(minutes);
}

// Function to preheat the oven to a specific temperature
function preheatOven(temp) {
    console.log(`Preheating oven to ${temp}°C.`);
    event.preheatOven(temp);
}

// Function to check the oven status
function checkOvenStatus() {
    let status = event.getOvenStatus();
    console.log(`Oven status: ${status}`);
    return status;
}

// Function to bake a specific dish with predefined settings
function bakeDish(dish) {
    const recipes = {
        'cake': { temp: 180, time: 30 },
        'pizza': { temp: 220, time: 15 },
        'bread': { temp: 200, time: 40 }
    };

    if (recipes[dish]) {
        console.log(`Baking ${dish} at ${recipes[dish].temp}°C for ${recipes[dish].time} minutes.`);
        preheatOven(recipes[dish].temp);
        setCookingTimer(recipes[dish].time);
        // Check oven status during baking process
        setTimeout(checkOvenStatus, 5000);  // Check status after 5 minutes
    } else {
        console.log(`Recipe for ${dish} not found.`);
    }
}

// Routine to bake a cake in the morning
function morningBakingRoutine() {
    if(event.morningBakingRoutine) {
        bakeDish('cake');
    }
}

// Routine to prepare dinner by baking a pizza in the evening
function eveningBakingRoutine() {
    if(event.eveningBakingRoutine) {
        bakeDish('pizza');
    }
}
