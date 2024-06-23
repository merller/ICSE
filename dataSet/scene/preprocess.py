#用于将正常书写格式的代码通过换行符和缩进符号转换为单行代码
def convert_to_single_line(code):
    # Strip leading and trailing whitespace
    stripped_code = code.strip()
    # Replace newline characters with a special marker
    single_line_code = stripped_code.replace('\n', '\\n')
    return single_line_code

# Example usage
code = """
function eveningOfficeRoutine() {
    if (event.eveningOfficeRoutine) {
        adjustOfficeLighting(0, 0);
        setHVACTemperature('18:00', 20);
        event.shutDownNonEssentialSystems();
    }
}
function adjustOfficeLighting(occupancy, brightness) {
    if (occupancy > 0) {
        console.log(`Office occupied. Setting lights to ${brightness}%.`);
        event.setOfficeLighting('on', brightness);
    } else {
        console.log("Office empty. Turning lights off.");
        event.setOfficeLighting('off', 0);
    }
}
function setHVACTemperature(time, temp) {
    console.log(`Setting HVAC temperature to ${temp}°C at ${time}.`);
    event.setHVACTemperature(temp);
}
"""
single_line_code = convert_to_single_line(code)
print(single_line_code)