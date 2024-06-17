// Function to set smart lights color for a cozy atmosphere
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

// Function to display poetry on a smart display
function displayPoetry(poetry) {
    console.log(`Displaying poetry: ${poetry}.`);
    event.displayText(poetry);
}

// Function to recite poetry using a voice assistant
function recitePoetry(poetry) {
    console.log(`Reciting poetry: ${poetry}.`);
    event.recitePoetry(poetry);
}

// Routine to create a World Poetry Day atmosphere in a home with children
function poetryDayRoutine() {
    const colors = ['purple', 'blue'];
    const music = 'Music3.mp3';
    const poetry = [
        'A poem is a little path',
        'That leads you through the trees.',
        'It takes you to the cliffs and shores,',
        'To anywhere you please.'
    ];

    // Set initial lighting and temperature
    setLightsColor(colors[0]);  // Set to purple for a cozy atmosphere
    setThermostatTemperature(22);  // Set a comfortable room temperature

    // Play soothing music
    playSoothingMusic(music);

    // Display poetry every 2 minutes
    let index = 0;
    let poetryInterval = setInterval(() => {
        displayPoetry(poetry[index]);
        index++;
        if (index >= poetry.length) {
            clearInterval(poetryInterval);
        }
    }, 120000); // 2 minutes interval

    // Recite poetry using a voice assistant after 5 minutes
    setTimeout(() => {
        for (let i = 0; i < poetry.length; i++) {
            recitePoetry(poetry[i]);
        }
    }, 300000); // 5 minutes delay
}

// Run the World Poetry Day routine
poetryDayRoutine();
