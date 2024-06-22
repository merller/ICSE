// Function to monitor machine status
function monitorMachineStatus(machineId) {
    let status = event.getMachineStatus(machineId);
    console.log(`Machine ${machineId} status: ${JSON.stringify(status)}`);
    return status;
}

// Function to control production line
function controlProductionLine(lineId, state) {
    console.log(`Setting production line ${lineId} to ${state}.`);
    event.controlProductionLine(lineId, state);
}

// Function to optimize energy usage
function optimizeEnergyUsage() {
    console.log("Optimizing factory energy usage.");
    event.optimizeEnergyUsage();
}

// Function to alert maintenance team
function alertMaintenance(machineId) {
    console.log(`Alerting maintenance for machine ${machineId}.`);
    event.alertMaintenance(machineId);
}

// Morning routine for factory startup
function morningFactoryStartup() {
    if (event.morningFactoryStartup) {
        monitorMachineStatus('M1');
        controlProductionLine('L1', 'start');
        optimizeEnergyUsage();
    }
}

// Afternoon routine for factory operations
function afternoonFactoryOperations() {
    if (event.afternoonFactoryOperations) {
        monitorMachineStatus('M2');
        controlProductionLine('L2', 'run');
        alertMaintenance('M3');
    }
}

// Night routine for factory shutdown
function nightFactoryShutdown() {
    if (event.nightFactoryShutdown) {
        controlProductionLine('L1', 'stop');
        controlProductionLine('L2', 'stop');
        optimizeEnergyUsage();
        monitorMachineStatus('M3');
    }
}
