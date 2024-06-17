// Function to set smart lights color for a calm and respectful atmosphere
function setLightsColor(color) {
    console.log(`Setting lights color to ${color}.`);
    event.setLightsColor(color);
}

// Function to adjust the thermostat
function setThermostatTemperature(temp) {
    console.log(`Setting thermostat temperature to ${temp}°C.`);
    event.setThermostatTemperature(temp);
}

// Function to display informative messages about cancer awareness
function displayInformativeMessage(message) {
    console.log(`Displaying informative message: ${message}.`);
    event.displayMessage(message);
}

// Function to display slides or relevant information on a smart display
function displaySlide(slide) {
    console.log(`Displaying slide: ${slide}.`);
    event.displaySlide(slide);
}

// Routine to create a World Cancer Day atmosphere in a hospital setting
function worldCancerDayRoutine() {
    const colors = ['soft blue', 'gentle white'];
    const messages = [
        'Welcome to World Cancer Day.',
        'Early detection of cancer can save lives.',
        'Learn about the importance of cancer prevention and treatment.',
        'Support those affected by cancer and spread awareness.'
    ];
    const slides = ['slide1.jpg', 'slide2.jpg', 'slide3.jpg', 'slide4.jpg'];

    // Set initial lighting and temperature
    setLightsColor(colors[0]);  // Set to soft blue for a calm atmosphere
    setThermostatTemperature(22);  // Set a comfortable room temperature

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

// Function to handle the event when the main presentation or talk starts
function presentationStarts() {
    console.log('Main presentation is starting.');
    // Additional actions can be added here if needed when the presentation starts
}

// Check if today is World Cancer Day (February 4th) and run the routine
function checkWorldCancerDay() {
    let today = new Date();
    if (today.getMonth() === 1 && today.getDate() === 4) { // February is month 1 in JavaScript Date
        console.log('Today is World Cancer Day!');
        worldCancerDayRoutine();

        // Simulate the main presentation starting after a delay
        setTimeout(presentationStarts, 3600000); // Main presentation starts after 1 hour
    } else {
        console.log('Today is not World Cancer Day.');
    }
}

// Run the check
checkWorldCancerDay();
