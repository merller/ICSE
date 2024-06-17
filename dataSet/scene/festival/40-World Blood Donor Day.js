// Function to set smart lights color for a blood donation atmosphere
function setLightsColor(color) {
    console.log(`Setting lights color to ${color}.`);
    event.setLightsColor(color);
}

// Function to play calming music
function playCalmingMusic(music) {
    console.log(`Playing calming music: ${music}.`);
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

// Function to display messages about blood donation
function displayDonationMessage(message) {
    console.log(`Displaying donation message: ${message}.`);
    event.displayMessage(message);
}

// Function to display images or videos on a smart display
function displayMedia(media) {
    console.log(`Displaying media: ${media}.`);
    event.displayMedia(media);
}

// Routine to create a World Blood Donor Day atmosphere in a school
function worldBloodDonorDayRoutine() {
    const colors = ['red', 'light red'];
    const music = ['CalmPiano.mp3', 'RelaxingStrings.mp3'];
    const messages = [
        'Welcome to World Blood Donor Day at the school.',
        'Donate blood, save a life!',
        'Every drop counts, be a hero and donate today.',
        'Thank you to all blood donors for their life-saving contributions.'
    ];
    const media = ['image1.jpg', 'image2.jpg', 'video1.mp4'];

    // Set initial lighting and temperature
    setLightsColor(colors[0]);  // Set to red for a blood donation atmosphere
    setThermostatTemperature(22);  // Set a comfortable room temperature

    // Loop to play calming music
    for (let i = 0; i < music.length; i++) {
        setTimeout(() => {
            playCalmingMusic(music[i]);
        }, i * 1800000); // 30 minutes interval
    }

    // Loop to display messages every 15 minutes
    for (let i = 0; i < messages.length; i++) {
        setTimeout(() => {
            displayDonationMessage(messages[i]);
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
    stopMusic();
}

// Check if today is World Blood Donor Day (June 14th) and run the routine
function checkWorldBloodDonorDay() {
    let today = new Date();
    if (today.getMonth() === 5 && today.getDate() === 14) { // June is month 5 in JavaScript Date
        console.log('Today is World Blood Donor Day!');
        worldBloodDonorDayRoutine();

        // Simulate the special presentation starting after a delay
        setTimeout(presentationStarts, 3600000); // Special presentation starts after 1 hour
    } else {
        console.log('Today is not World Blood Donor Day.');
    }
}

// Run the check
checkWorldBloodDonorDay();
