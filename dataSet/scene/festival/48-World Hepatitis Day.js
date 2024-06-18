// Function to set smart lights color for a calming atmosphere
function setLightsColor(color) {
    console.log(`Setting lights color to ${color}.`);
    event.setLightsColor(color);
}

// Function to play informative and calming content about hepatitis
function playInformativeContent(content) {
    console.log(`Playing informative content: ${content}.`);
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

// Function to display messages about hepatitis awareness and prevention
function displayHepatitisMessage(message) {
    console.log(`Displaying hepatitis message: ${message}.`);
    event.displayMessage(message);
}

// Function to display images or videos on a smart display
function displayMedia(media) {
    console.log(`Displaying media: ${media}.`);
    event.displayMedia(media);
}

// Routine to create a World Hepatitis Day atmosphere in a hospital
function hepatitisDayRoutine() {
    const colors = ['soft yellow', 'light blue'];
    const content = ['HepatitisInfo1.mp4', 'HepatitisInfo2.mp4'];
    const messages = [
        'Welcome to World Hepatitis Day at the hospital.',
        'Learn about hepatitis and how to prevent it.',
        'Get tested for hepatitis and stay informed.',
        'Support those affected by hepatitis and spread awareness.'
    ];
    const media = ['hepatitis1.jpg', 'hepatitis2.jpg', 'hepatitisVideo1.mp4'];

    // Set initial lighting and temperature
    setLightsColor(colors[0]);  // Set to soft yellow for a calming atmosphere
    setThermostatTemperature(22);  // Set a comfortable room temperature

    // Loop to play informative content
    for (let i = 0; i < content.length; i++) {
        setTimeout(() => {
            playInformativeContent(content[i]);
        }, i * 1800000); // 30 minutes interval
    }

    // Loop to display messages every 15 minutes
    for (let i = 0; i < messages.length; i++) {
        setTimeout(() => {
            displayHepatitisMessage(messages[i]);
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

// Check if today is World Hepatitis Day (July 28th) and run the routine
function checkHepatitisDay() {
    let today = new Date();
    if (today.getMonth() === 6 && today.getDate() === 28) { // July is month 6 in JavaScript Date
        console.log('Today is World Hepatitis Day!');
        hepatitisDayRoutine();

        // Simulate the special presentation starting after a delay
        setTimeout(presentationStarts, 3600000); // Special presentation starts after 1 hour
    } else {
        console.log('Today is not World Hepatitis Day.');
    }
}

// Run the check
checkHepatitisDay();
