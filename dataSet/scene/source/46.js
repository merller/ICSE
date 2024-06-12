eventBus.on('babyAsleep', (babyId) => {
    event.sendNotification(`Baby ${babyId} is asleep.`); 
    event.startSleepMonitoring(babyId); 
});
eventBus.on('babyAwake', (babyId) => {
    event.sendNotification(`Baby ${babyId} is awake.`); 
    event.stopSleepMonitoring(babyId); 
});
eventBus.on('healthAnomalyDetected', (babyId, anomaly) => {
    event.sendNotification(`Health anomaly detected for baby ${babyId}: ${anomaly}.`); 
    event.alertParents(babyId, anomaly); 
    event.recordHealthData(babyId, anomaly); 
});
eventBus.on('environmentalAnomalyDetected', (anomaly) => {
    event.sendNotification(`Environmental anomaly detected: ${anomaly}.`); 
    event.adjustEnvironment(anomaly); 
});
eventBus.on('babyCrying', (babyId) => {
    event.sendNotification(`Baby ${babyId} is crying.`); 
    event.alertParents(babyId, 'crying'); 
    event.playSoothingMusic(babyId); 
});
function startSmartBabyMonitoringScene() {
    event.turnOnBabyMonitor(); 
    event.activateHealthMonitoring(); 
    event.setEnvironmentalControls(); 
    event.sendNotification('Smart Baby Monitoring Scene started.'); 
}
startSmartBabyMonitoringScene();
