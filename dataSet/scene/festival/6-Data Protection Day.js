// Function to set smart lights color for a presentation atmosphere
function setLightsColor(color) {
    console.log(`Setting lights color to ${color}.`);
    event.setLightsColor(color);
}

// Function to play background music before the speech
function playBackgroundMusic(song) {
    console.log(`Playing background music: ${song}.`);
    event.playMusic(song);
}

// Function to stop the music when the professor starts to speak
function stopMusic() {
    console.log('Stopping background music.');
    event.stopMusic();
}

// Function to adjust the thermostat
function setThermostatTemperature(temp) {
    console.log(`Setting thermostat temperature to ${temp}°C.`);
    event.setThermostatTemperature(temp);
}

// Function to display informational messages about data protection
function displayInformativeMessage(message) {
    console.log(`Displaying informational message: ${message}.`);
    event.displayMessage(message);
}

// Function to display slides or relevant information on a smart display
function displaySlide(slide) {
    console.log(`Displaying slide: ${slide}.`);
    event.displaySlide(slide);
}

// Routine to create a Data Protection Day atmosphere in a conference room
function dataProtectionDayRoutine() {
    const colors = ['cool white', 'soft blue'];
    const songs = ['AmbientMusic1', 'AmbientMusic2'];
    const messages = [
        'Welcome to Data Protection Day.',
        'Data protection is essential for privacy and security.',
        'Learn about best practices for data protection.',
        'Protecting data helps build trust and integrity.'
    ];
    const slides = ['slide1.jpg', 'slide2.jpg', 'slide3.jpg', 'slide4.jpg'];

    // Set initial lighting and temperature
    setLightsColor(colors[0]);  // Set to cool white for the speech
    setThermostatTemperature(22);  // Set a comfortable room temperature

    // Loop to play background music before the speech
    for (let i = 0; i < songs.length; i++) {
        setTimeout(() => {
            playBackgroundMusic(songs[i]);
        }, i * 1800000); // 30 minutes interval
    }

    // Loop to display informational messages every 15 minutes
    for (let i = 0; i < messages.length; i++) {
        setTimeout(() => {
            displayInformativeMessage(messages[i]);
        }, i * 900000); // 15 minutes interval
    }

    // Loop to display slides every 20 minutes
    for (let i = 0; i < slides.length; i++) {
        setTimeout(() => {
            displaySlide(slides[i]);
        }, i * 1200000); // 20 minutes interval
    }
}

// Function to handle the event when the professor starts to speak
function professorStartsToSpeak() {
    console.log('Professor is starting to speak.');
    stopMusic();
}

// Check if today is Data Protection Day (January 28th) and run the routine
function checkDataProtectionDay() {
    let today = new Date();
    if (today.getMonth() === 0 && today.getDate() === 28) { // January is month 0 in JavaScript Date
        console.log('Today is Data Protection Day!');
        dataProtectionDayRoutine();

        // Simulate the professor starting to speak after a delay
        setTimeout(professorStartsToSpeak, 60000); // Professor starts to speak after 1 minute
    } else {
        console.log('Today is not Data Protection Day.');
    }
}

// Run the check
checkDataProtectionDay();
