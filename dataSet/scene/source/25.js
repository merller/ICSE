function updateFlightInfo(flightInfo) {
    console.log(`Updating flight info: ${JSON.stringify(flightInfo)}.`);
    event.updateFlightInfo(flightInfo);
}
function sendSecurityCheckReminder() {
    console.log("Sending security check reminder.");
    event.sendSecurityCheckReminder();
}
function sendBoardingNotification() {
    console.log("Sending boarding notification.");
    event.sendBoardingNotification();
}
function sendBaggageDropReminder() {
    console.log("Sending baggage drop reminder.");
    event.sendBaggageDropReminder();
}
function trackBaggage(baggageStatus) {
    console.log(`Tracking baggage: ${baggageStatus}.`);
    event.trackBaggage(baggageStatus);
}
function sendBaggageArrivalNotification() {
    console.log("Sending baggage arrival notification.");
    event.sendBaggageArrivalNotification();
}
function monitorAndAdjustEnvironment(environmentData) {
    const { temperature, humidity, airQuality } = environmentData;
    console.log(`Temperature: ${temperature}°C, Humidity: ${humidity}%, Air Quality: ${airQuality}.`);
    event.monitorEnvironment(environmentData);
}
function playBackgroundMusic(music) {
    console.log(`Playing background music: ${music}.`);
    event.playBackgroundMusic(music);
}
function sendChargingStationReminder() {
    console.log("Sending charging station reminder.");
    event.sendChargingStationReminder();
}
eventBus.on('flightInfoUpdate', (flightInfo) => {
    updateFlightInfo(flightInfo);
    sendSecurityCheckReminder();
    sendBoardingNotification();
});
eventBus.on('baggageHandling', (baggageStatus) => {
    sendBaggageDropReminder();
    trackBaggage(baggageStatus);
    sendBaggageArrivalNotification();
});
eventBus.on('environmentMonitoring', (environmentData) => {
    monitorAndAdjustEnvironment(environmentData);
});
eventBus.on('passengerComfortService', (music) => {
    playBackgroundMusic(music);
    sendChargingStationReminder();
});
function setupAirportScene() {
    const flightInfo = { flightNumber: "AB123", status: "On Time", gate: "A1" };
    const baggageStatus = "Baggage loaded on flight AB123.";
    const environmentData = { temperature: 22, humidity: 50, airQuality: "Good" };
    const music = "Classical";
    eventBus.emit('flightInfoUpdate', flightInfo); 
    eventBus.emit('baggageHandling', baggageStatus); 
    eventBus.emit('environmentMonitoring', environmentData); 
    eventBus.emit('passengerComfortService', music); 
}
setupAirportScene();
function updateFlightInfo(flightInfo) {
    console.log(`Updating flight info: ${JSON.stringify(flightInfo)}.`);
    event.updateFlightInfo(flightInfo);
}
function sendSecurityCheckReminder() {
    console.log("Sending security check reminder.");
    event.sendSecurityCheckReminder();
}
function sendBoardingNotification() {
    console.log("Sending boarding notification.");
    event.sendBoardingNotification();
}
function sendBaggageDropReminder() {
    console.log("Sending baggage drop reminder.");
    event.sendBaggageDropReminder();
}
function trackBaggage(baggageStatus) {
    console.log(`Tracking baggage: ${baggageStatus}.`);
    event.trackBaggage(baggageStatus);
}
function sendBaggageArrivalNotification() {
    console.log("Sending baggage arrival notification.");
    event.sendBaggageArrivalNotification();
}
function monitorAndAdjustEnvironment(environmentData) {
    const { temperature, humidity, airQuality } = environmentData;
    console.log(`Temperature: ${temperature}°C, Humidity: ${humidity}%, Air Quality: ${airQuality}.`);
    event.monitorEnvironment(environmentData);
}
function playBackgroundMusic(music) {
    console.log(`Playing background music: ${music}.`);
    event.playBackgroundMusic(music);
}
function sendChargingStationReminder() {
    console.log("Sending charging station reminder.");
    event.sendChargingStationReminder();
}
eventBus.on('flightInfoUpdate', (flightInfo) => {
    updateFlightInfo(flightInfo);
    sendSecurityCheckReminder();
    sendBoardingNotification();
});
eventBus.on('baggageHandling', (baggageStatus) => {
    sendBaggageDropReminder();
    trackBaggage(baggageStatus);
    sendBaggageArrivalNotification();
});
eventBus.on('environmentMonitoring', (environmentData) => {
    monitorAndAdjustEnvironment(environmentData);
});
eventBus.on('passengerComfortService', (music) => {
    playBackgroundMusic(music);
    sendChargingStationReminder();
});
function setupAirportScene() {
    const flightInfo = { flightNumber: "AB123", status: "On Time", gate: "A1" };
    const baggageStatus = "Baggage loaded on flight AB123.";
    const environmentData = { temperature: 22, humidity: 50, airQuality: "Good" };
    const music = "Classical";
    eventBus.emit('flightInfoUpdate', flightInfo);
    eventBus.emit('baggageHandling', baggageStatus);
    eventBus.emit('environmentMonitoring', environmentData);
    eventBus.emit('passengerComfortService', music);
}
setupAirportScene();
