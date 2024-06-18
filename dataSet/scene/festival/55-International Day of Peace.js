// Function to set smart lights color for a calming atmosphere
function setLightsColor(color) {
    console.log(`Setting lights color to ${color}.`);
    event.setLightsColor(color);
}

// Function to play peaceful and uplifting music
function playPeacefulMusic(music) {
    console.log(`Playing peaceful music: ${music}.`);
    event.playMusic(music);
}

// Function to stop music playback
function stopMusic() {
    console.log('Stopping music playback.');
    event.stopMusic();
}

// Function to adjust the thermostat
function setThermostatTemperature(temp) {
    console.log(`Setting thermostat temperature to ${temp}°C.`);
    event.setThermostatTemperature(temp);
}

// Function to display messages about peace and harmony
function displayPeaceMessage(message) {
    console.log(`Displaying peace message: ${message}.`);
    event.displayMessage(message);
}

// Function to display images or videos on a smart display
function displayMedia(media) {
    console.log(`Displaying media: ${media}.`);
    event.displayMedia(media);
}

// Routine to create an International Day of Peace atmosphere in a school
function peaceDayRoutine() {
    const colors = ['soft blue', 'soft green'];
    const music = ['PeacefulMusic1.mp3', 'PeacefulMusic2.mp3'];
    const messages = [
        'Welcome to the International Day of Peace at the school.',
        'Promote peace, unity, and understanding.',
        'Learn about different cultures and traditions.',
        'Celebrate the importance of peace in our world.'
    ];
    const media = ['peace1.jpg', 'peace2.jpg', 'peaceVideo1.mp4'];

    // Set initial lighting and temperature
    setLightsColor(colors[0]);  // Set to soft blue for a calming atmosphere
    setThermostatTemperature(22);  // Set a comfortable room temperature

    // Loop to play peaceful music
    for (let i = 0; i < music.length; i++) {
        setTimeout(() => {
            playPeacefulMusic(music[i]);
        }, i * 1800000); // 30 minutes interval
    }

    // Loop to display messages every 15 minutes
    for (let i = 0; i < messages.length; i++) {
        setTimeout(() => {
            displayPeaceMessage(messages[i]);
        }, i * 900000); // 15 minutes interval
    }

    // Loop to display media every 20 minutes
    for (let i = 0; i < media.length; i++) {
        setTimeout(() => {
            displayMedia(media[i]);
        }, i * 1200000); // 20 minutes interval
    }
}

// Function to handle the event when a special presentation or activity starts
function activityStarts() {
    console.log('Special activity is starting.');
    stopMusic();
}

// Check if today is International Day of Peace (September 21st) and run the routine
function checkPeaceDay() {
    let today = new Date();
    if (today.getMonth() === 8 && today.getDate() === 21) { // September is month 8 in JavaScript Date
        console.log('Today is International Day of Peace!');
        peaceDayRoutine();

        // Simulate the special activity starting after a delay
        setTimeout(activityStarts, 3600000); // Special activity starts after 1 hour
    } else {
        console.log('Today is not International Day of Peace.');
    }
}

// Run the check
checkPeaceDay();
