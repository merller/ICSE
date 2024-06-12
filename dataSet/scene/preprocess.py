#用于将正常书写格式的代码通过换行符和缩进符号转换为单行代码
def convert_to_single_line(code):
    # Split the code into lines
    lines = code.split('\n')
    
    # Process each line
    processed_lines = []
    for line in lines:
        # Strip leading and trailing whitespace
        stripped_line = line.strip()
        # Replace leading spaces with \t
        leading_spaces = len(line) - len(line.lstrip(' '))
        tabs = '\t' * (leading_spaces // 4)  # Assuming 4 spaces per tab
        processed_lines.append(f"{tabs}{stripped_line}")
    
    # Join processed lines with \n
    single_line_code = '\\n'.join(processed_lines)
    
    return single_line_code

# Example usage
code = """
function turnOnFragranceMachine() {
    event.turnOnFragranceMachine();
}
function setAirConditionerTemperature(temperature) {
    console.log(`Setting air conditioner temperature to ${temperature}℃`);
    event.setAirConditionerTemperature(temperature);
}
function adjustLighting(lightIds, temperature) {
    lightIds.forEach(id => {
        event.turnOnlight(id);
        event.changelight(id, temperature);
    });
}
function playHappyBirthday(){
    event.playMusic('happy birthday');
}
function displayPhotos(){
    event.turnOnScreen();                 
    getphoto().forEach(photo=>{setTimeout(()=>{event.display(photo)},1000);})                          //每张照片轮播一秒
}
eventBus.on('fontDoorMovement',()=>{
    adjustLighting(getLightId(),1000);       
    playHappyBirthday();
    displayPhotos();
})
function  setupBirthdayScene(){
    setAirConditionerTemperature(23);
    turnOnFragranceMachine();
    setTimeout(()=>eventBus.emit('fontDoorMovement'),1000);
}"""
single_line_code = convert_to_single_line(code)
print(single_line_code)
