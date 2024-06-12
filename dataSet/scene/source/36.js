function startSmartConstructionScene() {
    event.turnOnSecuritySystem(); 
    event.turnOnSiteLights(); 
    event.startMachineMonitoring(); 
    event.activateDroneSurveillance(); 
    event.sendNotification('Smart Construction Scene started.'); 
}
eventBus.on('machineErrorDetected', (machineId) => {
    event.sendNotification(`Machine error detected on ${machineId}. Shutting down and dispatching repair team.`); 
    event.shutDownMachine(machineId); 
    event.dispatchRepairTeam(machineId); 
});
eventBus.on('fallDetected', (workerId) => {
    event.sendNotification(`Fall detected for worker ${workerId}. Sending medical assistance.`); 
    event.sendMedicalAssistance(workerId); 
    event.recordIncident(workerId); 
});
eventBus.on('highTemperatureDetected', () => {
    event.sendNotification('High temperature detected! Activating cooling systems and sending hydration reminders.'); 
    event.activateCoolingSystems(); 
    event.sendHydrationReminders(); 
});
eventBus.on('poorAirQualityDetected', () => {
    event.sendNotification('Poor air quality detected! Activating air purification systems.'); 
    event.activateAirPurifiers(); 
});
eventBus.on('materialsArrived', (materialId) => {
    event.sendNotification(`Materials arrived: ${materialId}. Logging and notifying relevant teams.`); 
    event.logMaterials(materialId); 
    event.notifyTeams(materialId); 
});
eventBus.on('taskCompleted', (taskId) => {
    event.sendNotification(`Task completed: ${taskId}. Logging and updating project status.`); 
    event.logTaskCompletion(taskId); 
    event.updateProjectStatus(taskId); 
});
startSmartConstructionScene();
