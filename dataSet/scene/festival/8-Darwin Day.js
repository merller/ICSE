// Function to set smart lights color for an educational atmosphere
function setLightsColor(color) {
    console.log(`Setting lights color to ${color}.`);
    event.setLightsColor(color);
}

// Function to play educational audio about Darwin
function playEducationalAudio(audio) {
    console.log(`Playing educational audio: ${audio}.`);
    event.playAudio(audio);
}

// Function to stop educational audio
function stopAudio() {
    console.log('Stopping educational audio.');
    event.stopAudio();
}

// Function to adjust the thermostat
function setThermostatTemperature(temp) {
    console.log(`Setting thermostat temperature to ${temp}°C.`);
    event.setThermostatTemperature(temp);
}

// Function to display informative messages about Darwin and evolution
function displayInformativeMessage(message) {
    console.log(`Displaying informative message: ${message}.`);
    event.displayMessage(message);
}

// Function to display slides or relevant information on a smart display
function displaySlide(slide) {
    console.log(`Displaying slide: ${slide}.`);
    event.displaySlide(slide);
}

// Routine to create a Darwin Day atmosphere in a museum setting
function darwinDayRoutine() {
    const colors = ['soft white', 'warm yellow'];
    const audios = ['DarwinAudio1.mp3', 'DarwinAudio2.mp3', 'DarwinAudio3.mp3'];
    const messages = [
        'Welcome to Darwin Day.',
        'Learn about Charles Darwin and his contributions to science.',
        'Discover the principles of evolution and natural selection.',
        'Explore the impact of Darwin\'s work on modern biology.'
    ];
    const slides = ['slide1.jpg', 'slide2.jpg', 'slide3.jpg', 'slide4.jpg'];

    // Set initial lighting and temperature
    setLightsColor(colors[0]);  // Set to soft white for an educational atmosphere
    setThermostatTemperature(22);  // Set a comfortable room temperature

    // Loop to play educational audio about Darwin
    for (let i = 0; i < audios.length; i++) {
        setTimeout(() => {
            playEducationalAudio(audios[i]);
        }, i * 1800000); // 30 minutes interval
    }

    // Loop to display informative messages every 15 minutes
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

// Function to handle the event when a special presentation or talk starts
function presentationStarts() {
    console.log('Special presentation is starting.');
    stopAudio();
}

// Check if today is Darwin Day (February 12th) and run the routine
function checkDarwinDay() {
    let today = new Date();
    if (today.getMonth() === 1 && today.getDate() === 12) { // February is month 1 in JavaScript Date
        console.log('Today is Darwin Day!');
        darwinDayRoutine();

        // Simulate the special presentation starting after a delay
        setTimeout(presentationStarts, 3600000); // Special presentation starts after 1 hour
    } else {
        console.log('Today is not Darwin Day.');
    }
}

// Run the check
checkDarwinDay();
