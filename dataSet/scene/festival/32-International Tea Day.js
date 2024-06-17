// Function to set cozy lighting effects
function setCozyLighting() {
    console.log('Setting cozy lighting effects.');
    event.setLightingColor('green'); // Green light creates a calming and natural atmosphere
}

// Function to play soothing tea-themed music
function playTeaMusic() {
    console.log('Playing soothing tea-themed music.');
    event.playSounds('TeaMusic.mp3');
}

// Function to stop sound playback
function stopSounds() {
    console.log('Stopping sound playback.');
    event.stopSounds();
}

// Function to display information about different tea varieties
function displayTeaInfo(teas) {
    console.log('Displaying tea information.');
    for (let i = 0; i < teas.length; i++) {
        setTimeout(() => {
            event.displayText(teas[i]);
        }, i * 60000); // Display every minute
    }
}

// Function to manage interactive activities related to tea
function manageInteractiveActivities() {
    console.log('Managing interactive activities.');
    event.activateActivities('tea-time');
}

// Routine to create an International Tea Day atmosphere in a home
function teaDayRoutine() {
    const teas = [
        'Black tea: Full-bodied and rich, often enjoyed with milk and sugar.',
        'Green tea: Light and refreshing, known for its health benefits.',
        'Herbal tea: Made from herbs, flowers, and spices, caffeine-free and soothing.',
        'Oolong tea: Semi-oxidized tea with a complex flavor profile.'
    ];

    // Set cozy lighting effects
    setCozyLighting();

    // Play soothing tea-themed music
    playTeaMusic();

    // Display information about different tea varieties
    displayTeaInfo(teas);

    // Manage interactive activities
    manageInteractiveActivities();
}

// Run the International Tea Day routine for the home
teaDayRoutine();
