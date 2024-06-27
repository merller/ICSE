function scanTicket(ticketInfo) {
    console.log(`Scanning ticket: ${JSON.stringify(ticketInfo)}.`);
    event.scanTicket(ticketInfo);
}

function sendWelcomeMessage(visitorInfo) {
    console.log(`Sending welcome message to ${visitorInfo.name}.`);
    event.sendWelcomeMessage(visitorInfo);
}

function displayExhibitInfo(exhibitInfo) {
    console.log(`Displaying info for exhibit: ${JSON.stringify(exhibitInfo)}.`);
    event.displayExhibitInfo(exhibitInfo);
}

function startAudioGuide(exhibitInfo) {
    console.log(`Starting audio guide for exhibit: ${exhibitInfo.name}.`);
    event.startAudioGuide(exhibitInfo);
}

function adjustEnvironment(environmentData) {
    const { temperature, humidity } = environmentData;
    console.log(`Adjusting environment - Temperature: ${temperature}°C, Humidity: ${humidity}%.`);
    event.adjustEnvironment(environmentData);
}

function adjustLighting(lightingData) {
    console.log(`Adjusting lighting to ${lightingData.level} level.`);
    event.adjustLighting(lightingData);
}

function sendRestAreaReminder(visitorInfo) {
    console.log(`Sending rest area reminder to ${visitorInfo.name}.`);
    event.sendRestAreaReminder(visitorInfo);
}

function sendSafetyAlert(visitorInfo) {
    console.log(`Sending safety alert to ${visitorInfo.name}.`);
    event.sendSafetyAlert(visitorInfo);
}

function visitorEnter(visitorInfo) {
    if (event.visitorEnter) {
        scanTicket(visitorInfo.ticket);
        sendWelcomeMessage(visitorInfo);
    }
}

function exhibitInteraction(exhibitInfo) {
    if (event.exhibitInteraction) {
        displayExhibitInfo(exhibitInfo);
        startAudioGuide(exhibitInfo);
    }
}

function environmentControl(environmentData) {
    if (event.environmentControl) {
        adjustEnvironment(environmentData);
        adjustLighting(environmentData.lighting);
    }
}

function visitorComfortService(visitorInfo) {
    if (event.visitorComfortService) {
        sendRestAreaReminder(visitorInfo);
    }
}

function safetyAlert(visitorInfo) {
    if (event.safetyAlert) {
        sendSafetyAlert(visitorInfo);
    }
}


