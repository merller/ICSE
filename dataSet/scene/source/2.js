function controlChristmasLights(){
    while(1){
        turnOnChristmasLights();
        setTimeout(() => {
            turnOffChristmasLights();
        }, duration * 1000);
    }
}

function playMerryChristmas(){
    playMusic('Merry Christmas');
}

function ChangeAmbianceLights(){
    turnOnAmbianceLights();
    lightIds.forEach(id => {
        changeLight(id, 1000);
    });
}

function controlProjectors(){
    turnOnProjectors();
    projectorsDisplay("Santa Claus.jpeg");
    getProjectors().forEach(projector => {
        projector.action = "rotate";
    });
}

function setupChristmasScene() {
    if(event. setupChristmasScene){
        controlChristmasLights(lightIds);
        controlProjectors();
        playMerryChristmas();
        ChangeAmbianceLights();
    }
}

