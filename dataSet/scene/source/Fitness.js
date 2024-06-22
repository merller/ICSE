// Function to count steps
function countSteps() {
    let steps = event.getSteps();
    console.log(`Steps counted: ${steps}`);
    return steps;
}

// Function to monitor heart rate
function monitorHeartRate() {
    let heartRate = event.getHeartRate();
    console.log(`Heart rate: ${heartRate} bpm`);
    return heartRate;
}

// Function to suggest a workout
function suggestWorkout(activityLevel) {
    let workout = activityLevel < 5000 ? 'light' : 'intense';
    console.log(`Suggested workout: ${workout}`);
    event.suggestWorkout(workout);
}

// Function to adjust fitness goals based on daily activity
function adjustFitnessGoals(steps) {
    if (steps < 10000) {
        console.log("Adjusting fitness goals for low activity.");
        event.setFitnessGoals('Increase activity');
    } else {
        console.log("Maintaining current fitness goals.");
        event.setFitnessGoals('Maintain activity');
    }
}

// Morning routine to check initial fitness levels
function morningFitnessRoutine() {
    if (event.morningFitnessRoutine) {
        let steps = countSteps();
        monitorHeartRate();
        suggestWorkout(steps);
    }
}

// Evening routine to review daily activity and adjust goals
function eveningFitnessRoutine() {
    if (event.eveningFitnessRoutine) {
        let steps = countSteps();
        monitorHeartRate();
        adjustFitnessGoals(steps);
    }
}
//These routines involve monitoring and adjusting fitness levels throughout the day. The morning routine begins with counting steps and monitoring heart rate to suggest an appropriate workout based on activity levels. In the evening, daily activity is reviewed to adjust fitness goals accordingly, ensuring consistent progress.
//Daily fitness routines start with counting steps and monitoring heart rate to suggest suitable workouts based on activity levels. Evening routines focus on reviewing daily steps and heart rate to adjust fitness goals for optimal progress.
//Fitness routines involve monitoring daily steps and heart rate to suggest appropriate workouts and adjust fitness goals accordingly
