// Function to set warm lighting effects
function setWarmLighting() {
    console.log('Setting warm lighting effects.');
    event.setLightingColor('orange'); // Orange light symbolizes warmth and appreciation
}

// Function to play soothing music
function playSoothingMusic() {
    console.log('Playing soothing music.');
    event.playSounds('SoothingMusic.mp3');
}

// Function to stop sound playback
function stopSounds() {
    console.log('Stopping sound playback.');
    event.stopSounds();
}

// Function to display messages of gratitude and love for parents
function displayGratitudeMessages(messages) {
    console.log('Displaying gratitude messages.');
    for (let i = 0; i < messages.length; i++) {
        setTimeout(() => {
            event.displayText(messages[i]);
        }, i * 60000); // Display every minute
    }
}

// Function to manage interactive activities to honor parents
function manageInteractiveActivities() {
    console.log('Managing interactive activities.');
    event.activateActivities('parents-celebration');
}

// Routine to create a Global Parents Day atmosphere in a home
function parentsDayRoutine() {
    const messages = [
        'Thank you for your unconditional love and support, Mom and Dad.',
        'You are our role models and our greatest blessings.',
        'Today, we celebrate you and all that you do for us. Happy Global Parents Day!'
    ];

    // Set warm lighting effects
    setWarmLighting();

    // Play soothing music
    playSoothingMusic();

    // Display gratitude messages
    displayGratitudeMessages(messages);

    // Manage interactive activities
    manageInteractiveActivities();
}

// Run the Global Parents Day routine for the home
parentsDayRoutine();
