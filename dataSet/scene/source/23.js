function startRace() {
    console.log("Race started!");
    event.startRace(new Date(), getIds());
}

function endRace(id) {
    console.log("Race ended!");
    event.endRace(new Date(), id);
}

function celebration() {
    event.playMusic('champion');
}

function deploySafetyCar() {
    console.log("Safety car deployed!");
    event.deploySafetyCar();
}

function onRaceStart() {
    if (event.raceStart) {
        startRace();
    }
}

var champion = 1;

function onRaceEnd() {
    if (event.raceEnd) {
        if (champion) {
            celebration();
            champion = 0;
        }
        endRace(getid());
    }
}

function onSafetyCarDeployed() {
    if (event.safetyCarDeployed) {
        deploySafetyCar();
    }
}


