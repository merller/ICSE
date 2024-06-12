function startSmartGridScene() {
    event.turnOnPowerGeneration();
    event.turnOnPowerDistribution();
    event.startEnergyMonitoring();
    event.sendNotification('Smart Grid Scene started.');
}
eventBus.on('peakDemandDetected', () => {
    event.sendNotification('Peak demand detected! Activating additional power sources.');
    event.activateAdditionalPowerSources();
    event.initiateDemandResponse();
});
eventBus.on('powerOutageDetected', (areaId) => {
    event.sendNotification(`Power outage detected in area ${areaId}. Dispatching repair crews.`);
    event.dispatchRepairCrews(areaId);
    event.redirectPowerFlow(areaId);
});
eventBus.on('abnormalEnergyConsumptionDetected', (meterId) => {
    event.sendNotification(`Abnormal energy consumption detected at meter ${meterId}. Investigating issue.`);
    event.investigateEnergyConsumption(meterId);
    event.adjustEnergySupply(meterId);
});
eventBus.on('renewableEnergyIncreased', (sourceId) => {
    event.sendNotification(`Increased renewable energy supply from ${sourceId}. Adjusting grid distribution.`);
    event.adjustGridDistribution(sourceId);
    event.storeExcessEnergy(sourceId);
});
eventBus.on('highTemperatureDetected', () => {
    event.sendNotification('High temperature detected! Activating cooling systems for power stations.');
    event.activateCoolingSystems();
});
startSmartGridScene();
