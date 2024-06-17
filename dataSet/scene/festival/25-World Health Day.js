// Function to set health-themed lighting effects
function setHealthLighting() {
    console.log('Setting health-themed lighting effects.');
    event.setLightingColor('green'); // Green light is often associated with health and nature
}

// Function to play soothing sounds
function playSoothingSounds() {
    console.log('Playing soothing sounds.');
    event.playSounds('SoothingSounds.mp3');
}

// Function to stop sound playback
function stopSounds() {
    console.log('Stopping sound playback.');
    event.stopSounds();
}

// Function to display educational content about health and well-being
function displayHealthInfo(content) {
    console.log(`Displaying health info: ${content}.`);
    event.displayText(content);
}

// Function to manage interactive exhibits promoting healthy lifestyle choices
function manageInteractiveExhibits() {
    console.log('Managing interactive exhibits.');
    event.activateExhibits('health-promotion');
}

// Routine to create a World Health Day atmosphere in a museum
function healthDayRoutine() {
    const info = [
        'World Health Day is celebrated to raise awareness about health issues and promote healthy living.',
        'Regular physical activity, balanced diet, and good hygiene are key to maintaining good health.',
        'Access to healthcare services and health education are essential for improving global health.'
    ];

    // Set health-themed lighting effects
    setHealthLighting();

    // Play soothing sounds
    playSoothingSounds();

    // Display health information
    for (let i = 0; i < info.length; i++) {
        setTimeout(() => {
            displayHealthInfo(info[i]);
        }, i * 300000); // Display every 5 minutes
    }

    // Manage interactive exhibits
    manageInteractiveExhibits();
}

// Run the World Health Day routine
healthDayRoutine();
