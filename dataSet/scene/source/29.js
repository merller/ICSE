function verifyCustomerIdentity(customerId) {
    if (customerId === 'valid') {
        event.openSecurityGate(); 
        event.sendNotification('Welcome to Smart Bank!'); 
    } else {
        event.sendNotification('Access Denied! Invalid Customer ID.'); 
    }
}
function processWithdrawal(amount) {
    if (amount <= event.getAccountBalance()) {
        event.dispenseCash(amount); 
        event.updateAccountBalance(-amount); 
        event.sendNotification(`Withdrawal of ${amount} CNY processed.`); 
    } else {
        event.sendNotification('Insufficient funds!'); 
    }
}
function processDeposit(amount) {
    event.acceptDeposit(amount); 
    event.updateAccountBalance(amount); 
    event.sendNotification(`Deposit of ${amount} CNY processed.`); 
}
eventBus.on('customerServiceRequest', (customerId, serviceType, amount) => {
    verifyCustomerIdentity(customerId); 
    if (serviceType === 'withdrawal') {
        processWithdrawal(amount); 
    } else if (serviceType === 'deposit') {
        processDeposit(amount); 
    }
});
eventBus.on('alarmTriggered', () => {
    event.closeSecurityGate(); 
    event.playAlarm(); 
});
function setupSmartBankScene() {
    event.turnOnSecuritySystem(); 
    event.turnOnBankLights(); 
    eventBus.emit('customerServiceRequest');
    eventBus.emit('alarmTriggered');
}
setupSmartBankScene();