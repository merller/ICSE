// Function to set football-themed lighting effects
function setFootballLighting() {
    console.log('Setting football-themed lighting effects.');
    event.setLightingColor('green'); // Green light symbolizes the football field
}

// Function to play football-themed music
function playFootballMusic() {
    console.log('Playing football-themed music.');
    event.playSounds('FootballMusic.mp3');
}

// Function to stop sound playback
function stopSounds() {
    console.log('Stopping sound playback.');
    event.stopSounds();
}

// Function to display football trivia or quotes
function displayFootballTrivia(trivia) {
    console.log('Displaying football trivia.');
    for (let i = 0; i < trivia.length; i++) {
        setTimeout(() => {
            event.displayText(trivia[i]);
        }, i * 60000); // Display every minute
    }
}

// Function to manage interactive activities related to football
function manageInteractiveActivities() {
    console.log('Managing interactive activities.');
    event.activateActivities('football-celebration');
}

// Routine to create a World Football Day atmosphere in a home
function footballDayRoutine() {
    const trivia = [
        'The FIFA World Cup is the most prestigious football tournament in the world.',
        'Football is the most popular sport globally, with billions of fans worldwide.',
        'The fastest goal in football history was scored in 2.8 seconds.'
    ];

    // Set football-themed lighting effects
    setFootballLighting();

    // Play football-themed music
    playFootballMusic();

    // Display football trivia
    displayFootballTrivia(trivia);

    // Manage interactive activities
    manageInteractiveActivities();
}

// Run the World Football Day routine for the home
footballDayRoutine();
