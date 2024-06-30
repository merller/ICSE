// Function to monitor weather conditions
function monitorWeather() {
    let weatherData = event.getWeatherData();
    console.log(`Current weather data: ${JSON.stringify(weatherData)}`);
    return weatherData;
}

// Function to adjust irrigation based on weather
function adjustIrrigationBasedOnWeather(zone) {
    let weatherData = monitorWeather();
    if (weatherData.precipitation > 0) {
        console.log(`Rain detected. Skipping irrigation in ${zone}.`);
    } else {
        console.log(`No rain detected. Irrigating ${zone}.`);
        event.scheduleIrrigation(zone, 20);
    }
}

// Function to adjust lighting based on weather
function adjustLightingBasedOnWeather(zone) {
    let weatherData = monitorWeather();
    if (weatherData.cloudCover > 50) {
        console.log(`High cloud cover detected. Turning on additional lighting in ${zone}.`);
        event.controlLighting(zone, 'on');
    } else {
        console.log(`Low cloud cover detected. Using natural light in ${zone}.`);
        event.controlLighting(zone, 'off');
    }
}

// Morning routine for weather-based garden management
function morningRoutine() {
    if (event.morningRoutine) {
        adjustIrrigationBasedOnWeather('garden1');
        adjustLightingBasedOnWeather('garden1');
        console.log('Morning weather adaptation completed.');
    }
}

// Afternoon routine for weather-based garden management
function afternoonRoutine() {
    if (event.afternoonRoutine) {
        adjustIrrigationBasedOnWeather('garden2');
        adjustLightingBasedOnWeather('garden2');
        console.log('Afternoon weather adaptation completed.');
    }
}

// Evening routine for weather-based garden management
function eveningRoutine() {
    if (event.eveningRoutine) {
        adjustIrrigationBasedOnWeather('garden3');
        adjustLightingBasedOnWeather('garden3');
        console.log('Evening weather adaptation completed.');
    }
}


//When in morningRoutine, monitor the weather, if rain is detected, skip irrigation in garden1, otherwise, irrigate garden1 for 20 minutes. If cloud cover is greater than 50%, turn on additional lighting in garden1, otherwise, use natural light. When in afternoonRoutine, monitor the weather, if rain is detected, skip irrigation in garden2, otherwise, irrigate garden2 for 20 minutes. If cloud cover is greater than 50%, turn on additional lighting in garden2, otherwise, use natural light. When in eveningRoutine, monitor the weather, if rain is detected, skip irrigation in garden3, otherwise, irrigate garden3 for 20 minutes. If cloud cover is greater than 50%, turn on additional lighting in garden3, otherwise, use natural light.
//When in morningRoutine, adjust irrigation and lighting in garden1 based on weather conditions. When in afternoonRoutine, adjust irrigation and lighting in garden2 based on weather conditions. When in eveningRoutine, adjust irrigation and lighting in garden3 based on weather conditions.
//When in morningRoutine, manage irrigation and lighting based on weather. When in afternoonRoutine, manage irrigation and lighting based on weather. When in eveningRoutine, manage irrigation and lighting based on weather.
