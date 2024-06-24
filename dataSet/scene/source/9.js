function preheatOven(temperature) {
    console.log(`Preheating oven to ${temperature}°C`);
    event.preheatOven(temperature);
}

function playCookingGuide(guide) {
    console.log(`Playing cooking guide: ${guide}`);
    event.playCookingGuide(guide);
}

function adjustLighting() {
    const lightIntensity = getLightIntensity();
    if (lightIntensity < 300) {
        console.log("Adjusting kitchen lighting to brighter setting");
        event.adjustLighting("brighter");
    } else {
        console.log("Adjusting kitchen lighting to dimmer setting");
        event.adjustLighting("dimmer");
    }
}

function controlFan() {
    const temperature = getKitchenTemperature();
    if (temperature > 25) {
        console.log("Kitchen is too hot. Turning on fan.");
        event.turnOnFan();
    } else {
        console.log("Kitchen temperature is normal. Turning off fan.");
        event.turnOffFan();
    }
}

function adjustFotile(speed){
    if(speed != 0) {
        event.adjustFotile(speed);
    } else {
        event.turnOffFotile();
    }
}

function startCooking() {
    if(event.startCooking) {
        adjustFotile(1000);
        preheatOven(180);
        playCookingGuide("Step-by-step cooking instructions");
        monitorEnvironment();
        adjustLighting();
        controlFan();
    }
}

function endCooking() {
    if(event.endCooking) {
        adjustFotile(0);
        event.turnOffOven();
        event.turnOffScreen();
        adjustLighting();
        controlFan();
    }
}



