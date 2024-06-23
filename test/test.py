import re

def remove_single_line_comments(code):
    return re.sub(r'//.*', '', code)

def split_code_by_blank_lines(code):
    code = code.strip()
    functions = re.split(r'\n\s*\n', code)  # 按照空白行分割代码
    # 提取第一行注释作为函数的标识符
    function_identifiers = []
    for function in functions:
        lines = function.split('\n')
        first_comment = None
        for line in lines:
            line = line.strip()
            if line.startswith('//'):
                first_comment = line
                break
        if first_comment:
            function_identifiers.append(first_comment)
    
    return function_identifiers

# 示例代码
code = """
// Function to adjust office lighting based on occupancy
function adjustOfficeLighting(occupancy, brightness) {
    if (occupancy > 0) {
        console.log(`Office occupied. Setting lights to ${brightness}%.`);
        event.setOfficeLighting('on', brightness);
    } else {
        console.log("Office empty. Turning lights off.");
        event.setOfficeLighting('off', 0);
    }
}

// Function to set HVAC temperature based on time of day
function setHVACTemperature(time, temp) {
    console.log(`Setting HVAC temperature to ${temp}°C at ${time}.`);
    event.setHVACTemperature(temp);
}

// Function to check room occupancy
function checkRoomOccupancy() {
    let occupancy = event.getRoomOccupancy();
    console.log(`Room occupancy: ${occupancy}`);
    return occupancy;
}

// Function to manage energy usage based on room occupancy and time of day
function manageEnergyUsage() {
    let occupancy = checkRoomOccupancy();
    let time = new Date().toTimeString().split(' ')[0];
    let brightness = occupancy > 0 ? 70 : 0;
    adjustOfficeLighting(occupancy, brightness);
    setHVACTemperature(time, time < '12:00' ? 22 : 24);
}

// Morning routine to prepare the office for the day
function morningOfficeRoutine() {
    if (event.morningOfficeRoutine) {
        manageEnergyUsage();
    }
}

// Afternoon routine to optimize energy usage and comfort
function afternoonOfficeRoutine() {
    if (event.afternoonOfficeRoutine) {
        manageEnergyUsage();
    }
}

// Evening routine to shut down non-essential systems and save energy
function eveningOfficeRoutine() {
    if (event.eveningOfficeRoutine) {
        adjustOfficeLighting(0, 0); // Assume office is empty
        setHVACTemperature('18:00', 20);
        event.shutDownNonEssentialSystems();
    }
}
"""

# 运行函数并打印结果
identifiers = split_code_by_blank_lines(code)
for identifier in identifiers:
    print(identifier)
