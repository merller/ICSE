// Function to set safety-themed lighting effects
function setSafetyLighting() {
    console.log('Setting safety-themed lighting effects.');
    event.setLightingColor('yellow'); // Yellow light is often associated with caution and safety
}

// Function to play safety announcement
function playSafetyAnnouncement() {
    console.log('Playing safety announcement.');
    event.playSounds('SafetyAnnouncement.mp3');
}

// Function to stop sound playback
function stopSounds() {
    console.log('Stopping sound playback.');
    event.stopSounds();
}

// Function to display educational content about workplace safety
function displaySafetyInfo(content) {
    console.log(`Displaying safety info: ${content}.`);
    event.displayText(content);
}

// Function to manage interactive activities promoting workplace safety
function manageInteractiveActivities() {
    console.log('Managing interactive activities.');
    event.activateActivities('workplace-safety');
}

// Routine to create a World Day for Safety and Health at Work atmosphere in an industrial setting
function safetyDayRoutine() {
    const info = [
        'World Day for Safety and Health at Work raises awareness about workplace safety and health issues.',
        'Regular safety training, proper use of personal protective equipment, and reporting of hazards are key to preventing accidents.',
        'Creating a safe work environment is everyone\'s responsibility. Safety first, always!'
    ];

    // Set safety-themed lighting effects
    setSafetyLighting();

    // Play safety announcement
    playSafetyAnnouncement();

    // Display safety information
    for (let i = 0; i < info.length; i++) {
        setTimeout(() => {
            displaySafetyInfo(info[i]);
        }, i * 300000); // Display every 5 minutes
    }

    // Manage interactive activities
    manageInteractiveActivities();
}

// Run the World Day for Safety and Health at Work routine
safetyDayRoutine();
