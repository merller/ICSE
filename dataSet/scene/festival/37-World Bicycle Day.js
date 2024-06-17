// Function to set bicycle-themed lighting effects
function setBicycleLighting() {
    console.log('Setting bicycle-themed lighting effects.');
    event.setLightingColor('green'); // Green light symbolizes eco-friendliness and health
}

// Function to play energetic cycling music
function playCyclingMusic() {
    console.log('Playing energetic cycling music.');
    event.playSounds('CyclingMusic.mp3');
}

// Function to stop sound playback
function stopSounds() {
    console.log('Stopping sound playback.');
    event.stopSounds();
}

// Function to display cycling facts and benefits
function displayCyclingFacts(facts) {
    console.log('Displaying cycling facts.');
    for (let i = 0; i < facts.length; i++) {
        setTimeout(() => {
            event.displayText(facts[i]);
        }, i * 60000); // Display every minute
    }
}

// Function to manage interactive activities promoting cycling
function manageInteractiveActivities() {
    console.log('Managing interactive activities.');
    event.activateActivities('bicycle-day-celebration');
}

// Routine to create a World Bicycle Day atmosphere in a school
function bicycleDayRoutine() {
    const facts = [
        'Cycling is a great form of exercise that improves cardiovascular health.',
        'Bicycles are a sustainable mode of transportation that reduce carbon emissions.',
        'Cycling helps reduce traffic congestion and promotes a cleaner environment.'
    ];

    // Set bicycle-themed lighting effects
    setBicycleLighting();

    // Play energetic cycling music
    playCyclingMusic();

    // Display cycling facts
    displayCyclingFacts(facts);

    // Manage interactive activities
    manageInteractiveActivities();
}

// Run the World Bicycle Day routine for the school
bicycleDayRoutine();
