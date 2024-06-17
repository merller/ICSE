// Function to set smart lights color for a calming atmosphere
function setLightsColor(color) {
    console.log(`Setting lights color to ${color}.`);
    event.setLightsColor(color);
}

// Function to play soothing music
function playSoothingMusic(music) {
    console.log(`Playing soothing music: ${music}.`);
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

// Function to display informative content about Down syndrome
function displayDownSyndromeInfo(content) {
    console.log(`Displaying Down syndrome info: ${content}.`);
    event.displayText(content);
}

// Function to display images or videos on a smart display
function displayMedia(media) {
    console.log(`Displaying media: ${media}.`);
    event.displayMedia(media);
}

// Routine to create a World Down Syndrome Day atmosphere in a hospital
function downSyndromeDayRoutine() {
    const colors = ['blue', 'yellow'];
    const music = 'Music4.mp3';
    const info = [
        'Down syndrome is a genetic disorder caused by the presence of all or part of a third copy of chromosome 21.',
        'People with Down syndrome have an extra chromosome that impacts their physical and cognitive development.',
        'Down syndrome is the most common chromosomal condition, affecting approximately 1 in 700 births.'
    ];
    const media = ['image1.jpg', 'image2.jpg', 'video1.mp4'];

    // Set initial lighting and temperature
    setLightsColor(colors[0]);  // Set to blue for a calming atmosphere
    setThermostatTemperature(22);  // Set a comfortable room temperature

    // Play soothing music
    playSoothingMusic(music);

    // Display informative content about Down syndrome
    for (let i = 0; i < info.length; i++) {
        setTimeout(() => {
            displayDownSyndromeInfo(info[i]);
        }, i * 300000); // Display every 5 minutes
    }

    // Display media every 10 minutes
    for (let i = 0; i < media.length; i++) {
        setTimeout(() => {
            displayMedia(media[i]);
        }, i * 600000); // Display every 10 minutes
    }
}

// Run the World Down Syndrome Day routine
downSyndromeDayRoutine();
