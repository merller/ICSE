// 事件定义
const events = {
    startCleaningRobot: {
        name: "startCleaningRobot",
        description: "Start Cleaning Robot",
        kind: "action",
        input: {
            mode: "string"
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
    startMoppingRobot: {
        name: "startMoppingRobot",
        description: "Start Mopping Robot",
        kind: "action",
        input: {},
        output: {
            success: "bool"
        }
    },
    stopMoppingRobot: {
        name: "stopMoppingRobot",
        description: "Stop Mopping Robot",
        kind: "action",
        input: {},
        output: {
            success: "bool"
        }
    },
    startDeodorizing: {
        name: "startDeodorizing",
        description: "Start Deodorizing",
        kind: "action",
        input: {},
        output: {
            success: "bool"
        }
    },
    stopDeodorizing: {
        name: "stopDeodorizing",
        description: "Stop Deodorizing",
        kind: "action",
        input: {},
        output: {
            success: "bool"
        }
    },
    startDrying: {
        name: "startDrying",
        description: "Start Drying",
        kind: "action",
        input: {},
        output: {
            success: "bool"
        }
    },
    stopDrying: {
        name: "stopDrying",
        description: "Stop Drying",
        kind: "action",
        input: {},
        output: {
            success: "bool"
        }
    }
};

// 模拟事件触发
const event = {
    startCleaningRobot: (mode) => {
        console.log(`Cleaning robot started in ${mode} mode.`);
        document.dispatchEvent(new Event('cleaningCompleted'));
    },
    stopCleaningRobot: () => {
        console.log("Cleaning robot stopped.");
        document.dispatchEvent(new Event('cleaningRobotStopped'));
    },
    startMoppingRobot: () => {
        console.log("Mopping robot started.");
        document.dispatchEvent(new Event('moppingCompleted'));
    },
    stopMoppingRobot: () => {
        console.log("Mopping robot stopped.");
        document.dispatchEvent(new Event('moppingRobotStopped'));
    },
    startDeodorizing: () => {
        console.log("Deodorizing started.");
        document.dispatchEvent(new Event('deodorizingCompleted'));
    },
    stopDeodorizing: () => {
        console.log("Deodorizing stopped.");
        document.dispatchEvent(new Event('deodorizingStopped'));
    },
    startDrying: () => {
        console.log("Drying started.");
        document.dispatchEvent(new Event('dryingCompleted'));
    },
    stopDrying: () => {
        console.log("Drying stopped.");
        document.dispatchEvent(new Event('dryingStopped'));
    }
};

function startCleaningRobot(mode) {
    console.log(`Starting cleaning robot in ${mode} mode.`);
    event.startCleaningRobot(mode);
}

function stopCleaningRobot() {
    console.log("Stopping cleaning robot.");
    event.stopCleaningRobot();
}

function startMoppingRobot() {
    console.log("Starting mopping robot.");
    event.startMoppingRobot();
}

function stopMoppingRobot() {
    console.log("Stopping mopping robot.");
    event.stopMoppingRobot();
}

function startDeodorizing() {
    console.log("Starting deodorizing.");
    event.startDeodorizing();
}

function stopDeodorizing() {
    console.log("Stopping deodorizing.");
    event.stopDeodorizing();
}

function startDrying() {
    console.log("Starting drying.");
    event.startDrying();
}

function stopDrying() {
    console.log("Stopping drying.");
    event.stopDrying();
}


document.addEventListener('cleaningCompleted', () => {
    stopCleaningRobot();
});

document.addEventListener('cleaningRobotStopped', () => {
    startMoppingRobot();
});

document.addEventListener('moppingCompleted', () => {
    stopMoppingRobot();
});

document.addEventListener('moppingRobotStopped', () => {
    startDeodorizing();
});

document.addEventListener('deodorizingCompleted', () => {
    stopDeodorizing();
});

document.addEventListener('deodorizingStopped', () => {
    startDrying();
});

document.addEventListener('dryingCompleted', () => {
    stopDrying();
});

document.addEventListener('dryingStopped', () => {
    console.log("Cleaning process completed.");
});


startCleaningRobot("silent");
