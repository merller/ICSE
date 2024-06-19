// Function to set smart lights color for an informative atmosphere
function setLightsColor(color) {
    console.log(`Setting lights color to ${color}.`);
    event.setLightsColor(color);
}

// Function to play ambient music
function playAmbientMusic(music) {
    console.log(`Playing ambient music: ${music}.`);
    event.playMusic(music);
}

// Function to stop music playback
function stopMusic() {
    console.log('Stopping music playback.');
    event.stopMusic();
}

// Function to adjust the thermostat for comfort
function setThermostatTemperature(temp) {
    console.log(`Setting thermostat temperature to ${temp}°C.`);
    event.setThermostatTemperature(temp);
}

// Function to display messages about the significance of statistics
function displayStatisticsMessage(message) {
    console.log(`Displaying statistics message: ${message}.`);
    event.displayMessage(message);
}

// Function to display graphs, charts, or videos on a smart display
function displayMedia(media) {
    console.log(`Displaying media: ${media}.`);
    event.displayMedia(media);
}

// Routine to create a World Statistics Day atmosphere in a statistical office
function statisticsDayRoutine() {
    const colors = ['light blue', 'soft white'];
    const music = ['AmbientMusic1.mp3', 'AmbientMusic2.mp3'];
    const messages = [
        'Happy World Statistics Day!',
        'Celebrating the power of data and statistics.',
        'Statistics: the foundation of informed decisions.',
        'Promoting statistical literacy and understanding.'
    ];
    const media = ['statisticsGraph1.jpg', 'statisticsGraph2.jpg', 'statisticsVideo1.mp4'];

    // Set initial lighting and temperature
    setLightsColor(colors[0]);  // Set to light blue for an informative atmosphere
    setThermostatTemperature(22);  // Set a comfortable room temperature

    // Loop to play ambient music
    for (let i = 0; i < music.length; i++) {
        setTimeout(() => {
            playAmbientMusic(music[i]);
        }, i * 1800000); // 30 minutes interval
    }

    // Loop to display messages every 15 minutes
    for (let i = 0; i < messages.length; i++) {
        setTimeout(() => {
            displayStatisticsMessage(messages[i]);
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
function presentationStarts() {
    console.log('Special presentation is starting.');
    stopMusic();
}

// Check if today is World Statistics Day (October 20th) and run the routine
function checkStatisticsDay() {
    let today = new Date();
    if (today.getMonth() === 9 && today.getDate() === 20) { // October is month 9 in JavaScript Date
        console.log('Today is World Statistics Day!');
        statisticsDayRoutine();

        // Simulate the special presentation starting after a delay
        setTimeout(presentationStarts, 3600000); // Special presentation starts after 1 hour
    } else {
        console.log('Today is not World Statistics Day.');
    }
}

// Run the check
checkStatisticsDay();
