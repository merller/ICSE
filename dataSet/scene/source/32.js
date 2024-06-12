function startSmartGamingRoomScene() {
    event.turnOnGamingLights(); 
    event.setTemperature(20); 
    event.turnOnGamingConsole(); 
    event.turnOnSurroundSoundSystem(); 
    event.sendNotification('Smart Gaming Room Scene started.'); 
}
eventBus.on('gameStarted', (gameName) => {
    event.dimLights(); 
    event.startAmbientMusic(); 
    event.sendNotification(`Game ${gameName} has started! Enjoy your gaming experience.`); 
});
eventBus.on('gameEnded', (gameName) => {
    event.turnOnNormalLights(); 
    event.stopAmbientMusic(); 
    event.sendNotification(`Game ${gameName} has ended. Hope you had fun!`); 
});
eventBus.on('playerBreak', () => {
    event.turnOnRelaxationMode(); 
    event.sendNotification('Time for a break! Relax and recharge.'); 
});
startSmartGamingRoomScene();
