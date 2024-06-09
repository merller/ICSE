function controlGarageLights(state) {
    console.log(`Turning ${state} garage lights.`);
    event.controlGarageLights(state);
}
function updateParkingAvailability() {
    const availability = getParkingAvailability();
    console.log(`Updating parking availability: ${availability} spaces available.`);
    event.updateParkingAvailability(availability);
}
function recognizeLicensePlate() {
    const licensePlate = getLicensePlate();
    console.log(`Recognized license plate: ${licensePlate}`);
    event.recognizeLicensePlate(licensePlate);
}
function processPayment(licensePlate) {
    console.log(`Processing payment for license plate: ${licensePlate}`);
    event.processPayment(licensePlate);
}
eventBus.on('carEntering', () => {
    controlGarageLights('on');
    recognizeLicensePlate();
    updateParkingAvailability();
});
eventBus.on('carExiting', () => {
    const licensePlate = getLicensePlate();
    processPayment(licensePlate);
    updateParkingAvailability();
    controlGarageLights('off');
});
function setupParkingGarageScene() {
    eventBus.emit('carEntering'); 
    eventBus.emit('carExiting'); 
}
setupParkingGarageScene();
