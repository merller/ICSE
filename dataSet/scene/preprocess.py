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
appendModelPath", "original_string": "function appendModelPath (modelPath, id, internal) {\n  const addedModelPath = getModelPath(id)\n  if (internal) {\n    if (modelPath === '') {\n      return `properties._internal.${addedModelPath}`\n    }\n    return `${modelPath}.properties._internal.${addedModelPath}`\n  }\n  if (modelPath === '') {\n    return addedModelPath\n  }\n  return `${modelPath}.${addedModelPath}`\n}", "language": "javascript", "code": "function appendModelPath (modelPath, id, internal) {\n  const addedModelPath = getModelPath(id)\n  if (internal) {\n    if (modelPath === '') {\n      return `properties._internal.${addedModelPath}`\n    }\n    return `${modelPath}.properties._internal.${addedModelPath}`\n  }\n  if (modelPath === '') {\n    return addedModelPath\n  }\n  return `${modelPath}.${addedModelPath}`\n}", "code_tokens": ["function", "appendModelPath", "(", "modelPath", ",", "id", ",", "internal", ")", "{", "const", "addedModelPath", "=", "getModelPath", "(", "id", ")", "if", "(", "internal", ")", "{", "if", "(", "modelPath", "===", "''", ")", "{", "return", "`", "${", "addedModelPath", "}", "`", "}", "return", "`", "${", "modelPath", "}", "${", "addedModelPath", "}", "`", "}", "if", "(", "modelPath", "===", "''", ")", "{", "return", "addedModelPath", "}", "return", "`", "${", "modelPath", "}", "${", "addedModelPath", "}", "`", "}"], "docstring": "Create a path to add within a model\n\n@param {String} modelPath Path to current place within the model\n@param {String} id Id specified in the cell\n@param {Boolean} internal True if we want to add an internal model\n@returns {String} Path to add within the model"
"""
# Split the single line code into lines
lines = code.split('\\n')

# Process each line
processed_lines = []
for line in lines:
    # Remove leading tabs
    line = line.lstrip('\t')
    # Replace \t with 4 spaces
    line = line.replace('\t', '    ')
    processed_lines.append(line)

# Join processed lines with \n
multi_line_code = '\n'.join(processed_lines)

print(multi_line_code)
single_line_code = convert_to_single_line(code)
print(single_line_code)
