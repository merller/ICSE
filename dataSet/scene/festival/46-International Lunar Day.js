// Function to set smart lights color for a lunar atmosphere
function setLightsColor(color) {
    console.log(`Setting lights color to ${color}.`);
    event.setLightsColor(color);
}

// Function to play space-related sounds or informative content about the moon
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

// Function to display messages about lunar exploration and the importance of the moon
function displayLunarMessage(message) {
    console.log(`Displaying lunar message: ${message}.`);
    event.displayMessage(message);
}

// Function to display images or videos on a smart display
function displayMedia(media) {
    console.log(`Displaying media: ${media}.`);
    event.displayMedia(media);
}

// Routine to create an International Lunar Day atmosphere in a planetarium
function lunarDayRoutine() {
    const colors = ['silver', 'dark blue'];
    const content = ['LunarSounds1.mp3', 'LunarDocumentary1.mp4'];
    const messages = [
        'Welcome to International Lunar Day at the planetarium.',
        'Learn about the wonders of the moon and lunar exploration.',
        'Discover the significance of the moon in space exploration.',
        'Join us in celebrating the beauty and mystery of the moon.'
    ];
    const media = ['moon1.jpg', 'moon2.jpg', 'moonVideo1.mp4'];

    // Set initial lighting and temperature
    setLightsColor(colors[0]);  // Set to silver for a lunar atmosphere
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
            displayLunarMessage(messages[i]);
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

// Check if today is International Lunar Day (June 30th) and run the routine
function checkLunarDay() {
    let today = new Date();
    if (today.getMonth() === 6 && today.getDate() === 20) { // June is month 6 in JavaScript Date
        console.log('Today is International Lunar Day!');
        lunarDayRoutine();

        // Simulate the special presentation starting after a delay
        setTimeout(presentationStarts, 3600000); // Special presentation starts after 1 hour
    } else {
        console.log('Today is not International Lunar Day.');
    }
}

// Run the check
checkLunarDay();
