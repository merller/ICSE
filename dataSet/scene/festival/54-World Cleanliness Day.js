// Function to set smart lights color for an energizing atmosphere
function setLightsColor(color) {
    console.log(`Setting lights color to ${color}.`);
    event.setLightsColor(color);
}

// Function to play cheerful and motivating music
function playCheerfulMusic(music) {
    console.log(`Playing cheerful music: ${music}.`);
    event.playMusic(music);
}

// Function to stop music playback
function stopMusic() {
    console.log('Stopping music playback.');
    event.stopMusic();
}

// Function to display messages about cleanliness and hygiene
function displayCleanlinessMessage(message) {
    console.log(`Displaying cleanliness message: ${message}.`);
    event.displayMessage(message);
}

// Function to display images or videos on a smart display
function displayMedia(media) {
    console.log(`Displaying media: ${media}.`);
    event.displayMedia(media);
}

// Function to control a cleaning robot
function cleanHouse() {
    console.log('Starting cleaning robot.');
    event.startCleaningRobot();
}

// Routine to create a World Cleanliness Day atmosphere in a home
function cleanlinessDayRoutine() {
    const colors = ['clean white', 'fresh green'];
    const music = ['CheerfulMusic1.mp3', 'CheerfulMusic2.mp3'];
    const messages = [
        'Welcome to World Cleanliness Day at home.',
        'Learn about the importance of cleanliness and hygiene.',
        'Educate your children about the benefits of a clean environment.',
        'Make cleaning fun and enjoyable.'
    ];
    const media = ['cleanliness1.jpg', 'cleanliness2.jpg', 'cleanlinessVideo1.mp4'];

    // Set initial lighting
    setLightsColor(colors[0]);  // Set to clean white for an energizing atmosphere

    // Play cheerful music
    playCheerfulMusic(music[0]);

    // Display messages every 15 minutes
    for (let i = 0; i < messages.length; i++) {
        setTimeout(() => {
            displayCleanlinessMessage(messages[i]);
        }, i * 900000); // 15 minutes interval
    }

    // Display media every 20 minutes
    for (let i = 0; i < media.length; i++) {
        setTimeout(() => {
            displayMedia(media[i]);
        }, i * 1200000); // 20 minutes interval
    }

    // Clean the house with a cleaning robot after 30 minutes
    setTimeout(cleanHouse, 1800000); // Start cleaning after 30 minutes
}

// Function to handle the event when cleaning is completed
function cleaningCompleted() {
    console.log('Cleaning completed.');
}

// Run the World Cleanliness Day routine
cleanlinessDayRoutine();

// Simulate the cleaning completion after 2 hours
setTimeout(cleaningCompleted, 7200000); // Cleaning completed after 2 hours
