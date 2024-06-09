function detectTrafficFlow() {
    const trafficFlow = getTrafficFlowData();
    console.log(`Traffic flow detected: ${trafficFlow}.`);
    event.detectTrafficFlow(trafficFlow);
}
function adjustTrafficLights(duration) {
    console.log(`Adjusting traffic lights to ${duration} seconds.`);
    event.adjustTrafficLights(duration);
}
function detectTrafficAccident() {
    if (isAccidentDetected()) {
        console.log("Traffic accident detected. Triggering warning.");
        event.triggerAccidentWarning();
    }
}
function detectEmergencyVehicle() {
    if (isEmergencyVehicleDetected()) {
        console.log("Emergency vehicle detected. Adjusting traffic lights for priority passage.");
        event.adjustTrafficLightsForEmergency();
    }
}
function detectPedestrians() {
    if (arePedestriansDetected()) {
        console.log("Pedestrians detected. Adjusting traffic lights for safe crossing.");
        event.adjustTrafficLightsForPedestrians();
        event.playCrossingSignal();
    }
}
function calculateLightDuration() {
    return getflow() > 50 ? 30 : 60;
}
eventBus.on('trafficFlowDetected', () => {
    detectTrafficFlow();
    adjustTrafficLights(calculateLightDuration());
});
eventBus.on('pedestrian', () => {
    detectPedestrians();
});
eventBus.on('Emergency', () => {
    detectEmergencyVehicle();
});
eventBus.on('TrafficAccident', () => {
    detectTrafficAccident();
});
function setupTrafficControlScene() {
    setInterval(() => {
        eventBus.emit('trafficFlowDetected');
    }, 5000); 
    eventBus.emit('pedestrian');                     
    eventBus.emit('Emergency');                     
    eventBus.emit('TrafficAccident');                
}
setupTrafficControlScene();
