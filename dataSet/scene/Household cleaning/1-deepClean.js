// 事件定义
const events = {
    startCleaningRobot: {
        name: "startCleaningRobot",
        description: "Start Cleaning Robot",
        kind: "action",
        input: {
            pattern: "int"
        },
        output: {
            success: "bool"
        }
    },
    stopCleaningRobot: {
        name: "stopCleaningRobot",
        description: "Stop Cleaning Robot",
        kind: "action",
        input: {},
        output: {
            success: "bool"
        }
    },
    playMusic: {
        name: "playMusic",
        description: "Play Music",
        kind: "action",
        input: {
            musicType: "string"
        },
        output: {
            success: "bool"
        }
    },
    stopMusic: {
        name: "stopMusic",
        description: "Stop Music",
        kind: "action",
        input: {},
        output: {
            success: "bool"
        }
    }
};


const event = {
    startCleaningRobot: (room) => console.log(`Cleaning robot started in ${room}.`),
    stopCleaningRobot: () => console.log("Cleaning robot stopped."),
    playMusic: (musicType) => console.log(`Playing ${musicType}.`),
    stopMusic: () => console.log("Music stopped.")
};




function startCleaningRobot(room) {
    console.log(`Starting cleaning robot in ${room}.`);
    event.startCleaningRobot(room);
}

function stopCleaningRobot() {
    console.log("Stopping cleaning robot.");
    event.stopCleaningRobot();
}

function playRelaxingMusic() {
    console.log("Playing relaxing music.");
    event.playMusic("Relaxing Music");
}

function stopMusic() {
    console.log("Stopping music.");
    event.stopMusic();
}


function deepCleanBedroom(times) {
    playRelaxingMusic();
    for (let i = 0; i < times; i++) {
        console.log(`Starting cleaning cycle ${i + 1}`);
        startCleaningRobot("bedroom");

        setTimeout(stopCleaningRobot, 2000);
    }

    stopMusic();
}

deepCleanBedroom(2);
