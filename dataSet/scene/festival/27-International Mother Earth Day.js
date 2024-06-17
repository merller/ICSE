// Function to set earth-themed lighting effects
function setEarthLighting() {
    console.log('Setting earth-themed lighting effects.');
    event.setLightingColor('green'); // Green light is often associated with nature and the environment
}

// Function to play nature sounds
function playNatureSounds() {
    console.log('Playing nature sounds.');
    event.playSounds('NatureSounds.mp3');
}

// Function to stop sound playback
function stopSounds() {
    console.log('Stopping sound playback.');
    event.stopSounds();
}

// Function to display educational content about environmental protection
function displayEarthDayInfo(content) {
    console.log(`Displaying Earth Day info: ${content}.`);
    event.displayText(content);
}

// Function to manage interactive activities promoting environmental awareness
function manageInteractiveActivities() {
    console.log('Managing interactive activities.');
    event.activateActivities('environmental-awareness');
}

// Routine to create an International Mother Earth Day atmosphere in a home for children
function earthDayRoutine() {
    const info = [
        'International Mother Earth Day raises awareness about environmental issues and the need for sustainable living.',
        'Teaching children to reduce, reuse, and recycle helps protect the planet for future generations.',
        'Engaging in activities like gardening, composting, and nature walks can foster a love for the environment.'
    ];

    // Set earth-themed lighting effects
    setEarthLighting();

    // Play nature sounds
    playNatureSounds();

    // Display Earth Day information
    for (let i = 0; i < info.length; i++) {
        setTimeout(() => {
            displayEarthDayInfo(info[i]);
        }, i * 300000); // Display every 5 minutes
    }

    // Manage interactive activities
    manageInteractiveActivities();
}

// Run the International Mother Earth Day routine for children
earthDayRoutine();
