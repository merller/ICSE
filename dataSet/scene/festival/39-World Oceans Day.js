// Function to set smart lights color for an ocean atmosphere
function setLightsColor(color) {
    console.log(`Setting lights color to ${color}.`);
    event.setLightsColor(color);
}

// Function to play ocean sounds
function playOceanSounds(sounds) {
    console.log(`Playing ocean sounds: ${sounds}.`);
    event.playSounds(sounds);
}

// Function to stop sound playback
function stopSounds() {
    console.log('Stopping sound playback.');
    event.stopSounds();
}

// Function to adjust the thermostat
function setThermostatTemperature(temp) {
    console.log(`Setting thermostat temperature to ${temp}°C.`);
    event.setThermostatTemperature(temp);
}

// Function to display messages about marine conservation
function displayConservationMessage(message) {
    console.log(`Displaying conservation message: ${message}.`);
    event.displayMessage(message);
}

// Function to display images or videos on a smart display
function displayMedia(media) {
    console.log(`Displaying media: ${media}.`);
    event.displayMedia(media);
}

// Routine to create a World Oceans Day atmosphere in a zoo
function worldOceansDayRoutine() {
    const colors = ['blue', 'light blue'];
    const sounds = ['WavesCrashing.mp3', 'WhaleSongs.mp3'];
    const messages = [
        'Welcome to World Oceans Day at the zoo.',
        'Discover the wonders of the ocean and learn about marine conservation.',
        'Protect our oceans, protect our future!',
        'Reduce plastic pollution and preserve marine life.'
    ];
    const media = ['image1.jpg', 'image2.jpg', 'video1.mp4'];

    // Set initial lighting and temperature
    setLightsColor(colors[0]);  // Set to blue for an ocean atmosphere
    setThermostatTemperature(22);  // Set a comfortable room temperature

    // Loop to play ocean sounds
    for (let i = 0; i < sounds.length; i++) {
        setTimeout(() => {
            playOceanSounds(sounds[i]);
        }, i * 1800000); // 30 minutes interval
    }

    // Loop to display messages every 15 minutes
    for (let i = 0; i < messages.length; i++) {
        setTimeout(() => {
            displayConservationMessage(messages[i]);
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
    stopSounds();
}

// Check if today is World Oceans Day (June 8th) and run the routine
function checkWorldOceansDay() {
    let today = new Date();
    if (today.getMonth() === 5 && today.getDate() === 8) { // June is month 5 in JavaScript Date
        console.log('Today is World Oceans Day!');
        worldOceansDayRoutine();

        // Simulate the special presentation starting after a delay
        setTimeout(presentationStarts, 3600000); // Special presentation starts after 1 hour
    } else {
        console.log('Today is not World Oceans Day.');
    }
}

// Run the check
checkWorldOceansDay();
