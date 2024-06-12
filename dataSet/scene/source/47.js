eventBus.on('classStarted', (classId) => {
    event.sendNotification(`Class ${classId} has started.`); 
    event.turnOnInteractiveDevices(classId); 
    event.startAttendanceTracking(classId); 
});
eventBus.on('classEnded', (classId) => {
    event.sendNotification(`Class ${classId} has ended.`); 
    event.turnOffInteractiveDevices(classId); 
    event.saveAttendanceRecords(classId); 
});
eventBus.on('studentLoggedIn', (studentId) => {
    event.sendNotification(`Student ${studentId} logged into the online learning platform.`); 
    event.provideLearningResources(studentId); 
    event.trackLearningProgress(studentId); 
});
eventBus.on('equipmentFailureDetected', (equipmentId) => {
    event.sendNotification(`Equipment failure detected: ${equipmentId}. Dispatching repair team.`); 
    event.dispatchRepairTeam(equipmentId); 
    event.activateBackupEquipment(equipmentId); 
});
eventBus.on('emergencyDetected', () => {
    event.sendNotification('Emergency detected! Initiating evacuation procedures.'); 
    event.activateEvacuationProtocol(); 
    event.guideStudentsAndStaffToExits(); 
});
function startSmartSchoolScene() {
    event.turnOnSecuritySystem(); 
    event.activateSmartClassroomManagement(); 
    event.turnOnOnlineLearningPlatform(); 
    event.sendNotification('Smart School Scene started.'); 
}
startSmartSchoolScene();
