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


eventBus.on('intrusionDetected', () => {
    event.turnOnLights();
    playWarningSound();
    startRecording();
    sendAlert();
    checkDoorsAndWindows();
});

eventBus.on('safeConfirmed', () => {
    event.turnOffLights();
    stopRecording();
    event.stopWarningSound();
});


function setupSecurityScene() {
    checkDoorsAndWindows();

    eventBus.emit('intrusionDetected');
    eventBus.emit('safeConfirmed');
}


setupSecurityScene();