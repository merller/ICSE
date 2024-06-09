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
function sendRestAreaReminder() {
    event.sendRestAreaReminder(visitorInfo);
}
function sendSafetyAlert(visitorInfo) {
    console.log(`Sending safety alert to ${visitorInfo.name}.`);
    event.sendSafetyAlert(visitorInfo);
}
eventBus.on('visitorEnter', (visitorInfo) => {
    scanTicket(visitorInfo.ticket);
    sendWelcomeMessage(visitorInfo);
});
eventBus.on('exhibitInteraction', (exhibitInfo) => {
    displayExhibitInfo(exhibitInfo);
    startAudioGuide(exhibitInfo);
});
eventBus.on('environmentControl', (environmentData) => {
    adjustEnvironment(environmentData);
    adjustLighting(environmentData.lighting);
});
eventBus.on('visitorComfortService', (visitorInfo) => {
    sendRestAreaReminder(visitorInfo);
});
eventBus.on('safetyAlert', (visitorInfo) => {
    sendSafetyAlert(visitorInfo);
});
function setupMuseumScene() {
    const visitorInfo = getvisitorInfo();
    const exhibitInfo = getexhibitInfo();
    const environmentData = environmentData();
    eventBus.emit('visitorEnter', visitorInfo); 
     eventBus.emit('exhibitInteraction', exhibitInfo); 
    eventBus.emit('environmentControl', environmentData); 
     eventBus.emit('visitorComfortService', visitorInfo); 
     eventBus.emit('safetyAlert', visitorInfo); 
}
setupMuseumScene();
