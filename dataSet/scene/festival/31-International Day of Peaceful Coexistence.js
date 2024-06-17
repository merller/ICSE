// Function to set peaceful lighting effects
function setPeacefulLighting() {
    console.log('Setting peaceful lighting effects.');
    event.setLightingColor('blue'); // Blue light is often associated with peace and tranquility
}

// Function to play calming music
function playCalmingMusic() {
    console.log('Playing calming music.');
    event.playSounds('CalmingMusic.mp3');
}

// Function to stop sound playback
function stopSounds() {
    console.log('Stopping sound playback.');
    event.stopSounds();
}

// Function to display quotes or messages promoting peaceful coexistence
function displayPeacefulQuotes(quotes) {
    console.log('Displaying peaceful quotes.');
    for (let i = 0; i < quotes.length; i++) {
        setTimeout(() => {
            event.displayText(quotes[i]);
        }, i * 60000); // Display every minute
    }
}

// Function to manage interactive activities promoting peaceful coexistence
function manageInteractiveActivities() {
    console.log('Managing interactive activities.');
    event.activateActivities('peaceful-coexistence');
}

// Routine to create an International Day of Peaceful Coexistence atmosphere in a school
function peacefulCoexistenceDayRoutine() {
    const quotes = [
        'Peace begins with a smile. - Mother Teresa',
        'An eye for an eye only ends up making the whole world blind. - Mahatma Gandhi',
        'Together for peace: Respect, safety and dignity for all.'
    ];

    // Set peaceful lighting effects
    setPeacefulLighting();

    // Play calming music
    playCalmingMusic();

    // Display peaceful quotes
    displayPeacefulQuotes(quotes);

    // Manage interactive activities
    manageInteractiveActivities();
}

// Run the International Day of Peaceful Coexistence routine for the school
peacefulCoexistenceDayRoutine();
