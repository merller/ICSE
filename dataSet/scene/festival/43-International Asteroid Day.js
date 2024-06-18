// Function to set smart lights color for a cosmic atmosphere
function setLightsColor(color) {
    console.log(`Setting lights color to ${color}.`);
    event.setLightsColor(color);
}

// Function to play space-related sounds or informative content
function playSpaceContent(content) {
    console.log(`Playing space content: ${content}.`);
    event.playContent(content);
}

// Function to stop content playback
function stopContent() {
    console.log('Stopping content playback.');
    event.stopContent();
}

// Function to adjust the thermostat
function setThermostatTemperature(temp) {
    console.log(`Setting thermostat temperature to ${temp}°C.`);
    event.setThermostatTemperature(temp);
}

// Function to display messages about asteroids and space science
function displaySpaceMessage(message) {
    console.log(`Displaying space message: ${message}.`);
    event.displayMessage(message);
}

// Function to display images or videos on a smart display
function displayMedia(media) {
    console.log(`Displaying media: ${media}.`);
    event.displayMedia(media);
}

// Routine to create an International Asteroid Day atmosphere in a museum
function asteroidDayRoutine() {
    const colors = ['dark blue', 'purple'];
    const content = ['SpaceSounds1.mp3', 'SpaceDocumentary1.mp4'];
    const messages = [
        'Welcome to International Asteroid Day at the museum.',
        'Learn about the fascinating world of asteroids.',
        'Discover how asteroids have shaped our understanding of the universe.',
        'Join us in exploring the science behind asteroids and their impact.'
    ];
    const media = ['asteroid1.jpg', 'asteroid2.jpg', 'asteroidVideo1.mp4'];

    // Set initial lighting and temperature
    setLightsColor(colors[0]);  // Set to dark blue for a cosmic atmosphere
    setThermostatTemperature(22);  // Set a comfortable room temperature

    // Loop to play space-related content
    for (let i = 0; i < content.length; i++) {
        setTimeout(() => {
            playSpaceContent(content[i]);
        }, i * 1800000); // 30 minutes interval
    }

    // Loop to display messages every 15 minutes
    for (let i = 0; i < messages.length; i++) {
        setTimeout(() => {
            displaySpaceMessage(messages[i]);
        }, i * 900000); // 15 minutes interval
    }

    // Loop to display media every 20 minutes
    for (let i = 0; i < media.length; i++) {
        setTimeout(() => {
            displayMedia(media[i]);
        }, i * 1200000); // 20 minutes interval
    }
}

// Function to handle the event when a special presentation or talk starts
function presentationStarts() {
    console.log('Special presentation is starting.');
    stopContent();
}

// Check if today is International Asteroid Day (June 30th) and run the routine
function checkAsteroidDay() {
    let today = new Date();
    if (today.getMonth() === 5 && today.getDate() === 30) { // June is month 5 in JavaScript Date
        console.log('Today is International Asteroid Day!');
        asteroidDayRoutine();

        // Simulate the special presentation starting after a delay
        setTimeout(presentationStarts, 3600000); // Special presentation starts after 1 hour
    } else {
        console.log('Today is not International Asteroid Day.');
    }
}

// Run the check
checkAsteroidDay();
