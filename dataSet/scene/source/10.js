function startRecording() {
    console.log("Starting camera recording.");
    event.startRecording();
}

function stopRecording() {
    console.log("Stopping camera recording.");
    event.stopRecording();
}

function sendAlert() {
    console.log("Sending alert to security company.");
    event.sendAlert();
}

function checkDoorsAndWindows() {
    const allClosed = event.checkDoorsAndWindows();
    if (!allClosed) {
        console.log("Some doors or windows are open. Sending alert.");
        event.sendWarning("Some doors or windows are open.");
    }
}

function playWarningSound() {
    console.log("Playing warning sound.");
    event.playWarningSound();
}

function intrusionDetected() {
    if (event.intrusionDetected) {
        event.turnOnLights();
        playWarningSound();
        startRecording();
        sendAlert();
        checkDoorsAndWindows();
    }
}

function safeConfirmed() {
    if (event.safeConfirmed) {
        event.turnOffLights();
        stopRecording();
        event.stopWarningSound();
    }
}



