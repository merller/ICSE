eventBus.on('fishHealthAnomalyDetected', (sensorId, anomalyDetails) => {
    event.sendNotification(`Fish health anomaly detected by sensor ${sensorId}: ${anomalyDetails}.`); 
    event.investigateFishHealth(sensorId, anomalyDetails); 
    event.adjustFeedingSchedule(anomalyDetails); 
});
eventBus.on('waterQualityAnomalyDetected', (sensorId, anomalyDetails) => {
    event.sendNotification(`Water quality anomaly detected by sensor ${sensorId}: ${anomalyDetails}.`); 
    event.activateWaterPurificationSystem(sensorId); 
    event.collectWaterSample(sensorId); 
});
eventBus.on('droneSurveyCompleted', (droneId, surveyData) => {
    event.sendNotification(`Drone ${droneId} completed survey. Data: ${surveyData}.`); 
    event.analyzeSurveyData(surveyData); 
    event.updateFishPopulationData(surveyData); 
});
eventBus.on('waterTemperatureChangeDetected', (sensorId, temperature) => {
    event.sendNotification(`Water temperature change detected by sensor ${sensorId}: ${temperature}°C.`); 
    event.adjustWaterTemperatureControl(temperature); 
    event.notifyFishFarmManager(temperature); 
});
eventBus.on('illegalFishingDetected', (droneId, location) => {
    event.sendNotification(`Illegal fishing detected by drone ${droneId} at location ${location}.`); 
    event.alertAuthorities(location); 
    event.dispatchPatrolDrone(location); 
});
function startSmartFisheryManagementScene() {
    event.turnOnFisheryMonitoringSystem(); 
    event.activateUnderwaterSensors(); 
    event.deploySurveillanceDrones(); 
    event.setUpWaterQualityControl(); 
    event.sendNotification('Smart Fishery Management Scene started.'); 
}
startSmartFisheryManagementScene();
