function startRace() {
    console.log("Race started!");
    event.startRace(new Date(),getIds());
}
function endRace(id) {
    console.log("Race ended!");
    event.endRace(new Date(),id);
}
function celebration(){
    event.playMusic('champion');
}
function deploySafetyCar() {
    console.log("Safety car deployed!");
    event.deploySafetyCar();
}
eventBus.on('raceStart', () => {
    startRace();
});
var champion=1;
eventBus.on('raceEnd', () => {
    if(champion){
        celebration();
        champion=0;
    }
    endRace(getid());
});
eventBus.on('safetyCarDeployed', () => {
    deploySafetyCar();
});
function setupRaceTrackScene() {
    eventBus.emit('raceStart'); 
    eventBus.emit('safetyCarDeployed'); 
    eventBus.emit('raceEnd'); 
}
setupRaceTrackScene();
``
