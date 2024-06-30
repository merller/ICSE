// Function to detect pests
function detectPests(zone) {
    let pestDetected = event.detectPests(zone);
    console.log(`Pests detected in ${zone}: ${pestDetected}`);
    return pestDetected;
}

// Function to apply pesticide
function applyPesticide(zone) {
    console.log(`Applying pesticide in ${zone}.`);
    event.applyPesticide(zone);
}

// Function to monitor greenhouse environment
function monitorEnvironment(zone) {
    let environmentStatus = event.getEnvironmentStatus(zone);
    console.log(`Environment status in ${zone}: ${JSON.stringify(environmentStatus)}`);
    return environmentStatus;
}

// Function to alert greenhouse staff
function alertGreenhouseStaff(message) {
    console.log(`Alerting greenhouse staff: ${message}`);
    event.alertGreenhouseStaff(message);
}

// Morning routine for pest management
function morningRoutine() {
    if (event.morningRoutine) {
        let pests = detectPests('zone1');
        if (pests) {
            applyPesticide('zone1');
        }
        monitorEnvironment('zone1');
        alertGreenhouseStaff('Morning pest management completed.');
    }
}

// Afternoon routine for pest management
function afternoonRoutine() {
    if (event.afternoonRoutine) {
        let pests = detectPests('zone2');
        if (pests) {
            applyPesticide('zone2');
        }
        monitorEnvironment('zone2');
        alertGreenhouseStaff('Afternoon pest management completed.');
    }
}

// Evening routine for pest management
function eveningRoutine() {
    if (event.eveningRoutine) {
        let pests = detectPests('zone3');
        if (pests) {
            applyPesticide('zone3');
        }
        monitorEnvironment('zone3');
        alertGreenhouseStaff('Evening pest management completed.');
    }
}

//When in morningRoutine, detect pests in zone1 and apply pesticide if pests are detected, monitor the greenhouse environment, and alert greenhouse staff that morning pest management has been completed. When in afternoonRoutine, detect pests in zone2 and apply pesticide if pests are detected, monitor the greenhouse environment, and alert greenhouse staff that afternoon pest management has been completed. When in eveningRoutine, detect pests in zone3 and apply pesticide if pests are detected, monitor the greenhouse environment, and alert greenhouse staff that evening pest management has been completed.
//When in morningRoutine, manage pest detection and pesticide application in zone1, monitor the greenhouse environment, and alert staff. When in afternoonRoutine, manage pest detection and pesticide application in zone2, monitor the greenhouse environment, and alert staff. When in eveningRoutine, manage pest detection and pesticide application in zone3, monitor the greenhouse environment, and alert staff.
//When in morningRoutine, manage pest control and environment monitoring in zone1, and alert staff. When in afternoonRoutine, manage pest control and environment monitoring in zone2, and alert staff. When in eveningRoutine, manage pest control and environment monitoring in zone3, and alert staff.
