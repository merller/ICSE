function playMusic(track, duration){
    playMusic(track, duration * 1000);
}

function setAirConditionerTemperature(temperature) {
    console.log(`Setting air conditioner temperature to ${temperature}℃`);
    setAirConditionerTemperature(temperature);
}

function controlCurtains(command){
    if(command == 'close')
        closeCurtains();
    else if(command == 'open')
        openCurtains();
}

function controlLights(command){
    if(command == 'open')
        turnOnLights();
    else if(command == 'close')
        turnOffLights();
}

function playMovie(name){
    playMovie(name);
}

function movieNightStart() {
    playMusic("Cinematic Soundtrack", 120);
    controlLights('close');
    controlCurtains('close');
}

function movieNightEnd() {
    stopMusic("Cinematic Soundtrack");
    controlLights('open');
    controlCurtains('open');
}

function setupMovieScene(){
    setAirConditionerTemperature(23);
    movieNightStart();
    playMovie('The Shawshank Redemption');
    movieNightEnd();
}

setupMovieScene();
