// Function to lock the door
function lockDoor() {
    console.log("Locking the door.");
    event.lockDoor();
}

// Function to unlock the door
function unlockDoor() {
    console.log("Unlocking the door.");
    event.unlockDoor();
}

// Function to check the status of the door lock
function checkLockStatus() {
    let status = event.getLockStatus();
    console.log(`Door lock status: ${status}`);
    return status;
}

// Function to automatically lock the door after a certain time interval
function autoLockDoor(delay) {
    console.log(`The door will be locked in ${delay} seconds.`);
    setTimeout(() => {
        lockDoor();
    }, delay * 1000);
}

// Function to unlock the door when a recognized person is detected
function unlockForRecognizedPerson(person) {
    if (event.isPersonRecognized(person)) {
        console.log(`Recognized ${person}. Unlocking the door.`);
        unlockDoor();
    } else {
        console.log(`Unrecognized person: ${person}. Door remains locked.`);
    }
}

// Routine to lock the door every night at a specific time
function nightlyLockRoutine() {
    if(event.nightlyLockRoutine) {
        lockDoor();
    }
}

// Routine to unlock the door when the user arrives home
function arrivalRoutine(person) {
    if(event.arrivalRoutine) {
        unlockForRecognizedPerson(person);
    }
}
//When in the nightlyLockRoutine, the system locks the door. It also automatically locks the door after a specified delay. When in the arrivalRoutine, the system checks if the person is recognized; if so, it unlocks the door. Otherwise, the door remains locked. The system can also manually lock or unlock the door and check the status of the door lock.
//When in the nightlyLockRoutine, the system locks the door. When in the arrivalRoutine, the system unlocks the door for recognized persons. The system can also automatically lock the door after a delay and check the door lock status.
//Controls access to the door by locking or unlocking it based on routines and recognizing individuals.
