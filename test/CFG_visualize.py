import os
from graphviz import Digraph

def parse_js_code(js_code):
    # This is a simple parser, you may need a more sophisticated parser for complex JS code
    lines = js_code.strip().split('\n')
    nodes = []
    edges = []
    stack = []
    current_node = 0
    
    for line in lines:
        stripped_line = line.strip()
        if stripped_line.startswith("if"):
            nodes.append((current_node, stripped_line))
            if stack:
                edges.append((stack[-1], current_node))
            stack.append(current_node)
            current_node += 1
        elif stripped_line.startswith("else"):
            if stack:
                previous_if = stack.pop()
                nodes.append((current_node, stripped_line))
                edges.append((previous_if, current_node))
                stack.append(current_node)
                current_node += 1
        elif stripped_line.startswith("}"):
            if stack:
                stack.pop()
        else:
            nodes.append((current_node, stripped_line))
            if stack:
                edges.append((stack[-1], current_node))
            current_node += 1
    
    return nodes, edges

def draw_cfg(nodes, edges, output_path):
    graph = Digraph(comment='CFG')
    
    for node_id, label in nodes:
        graph.node(str(node_id), label)
    
    for edge_start, edge_end in edges:
        graph.edge(str(edge_start), str(edge_end))
    
    graph.render(output_path, format='png')

# Ensure the output directory exists
output_dir = "dataSet/Intermediate_data/CFG"
os.makedirs(output_dir, exist_ok=True)

# JavaScript code to analyze
js_code = """
const eventBus = new EventBus();
function playPartyMusic() {
    console.log("Playing party music.");
    event.playMusic("Party Playlist");
}
function stopPartyMusic() {
    console.log("Stopping party music.");
    event.stopMusic();
}
function controlPartyLights(mode) {
    console.log(`Setting lights to ${mode} mode.`);
    event.setLights(mode);
}
function controlFogMachine(action) {
    console.log(`${action} fog machine.`);
    if (action === "Starting") {
        event.startFogMachine();
    } else {
        event.stopFogMachine();
    }
}

function controlLaserLights(action) {
    console.log(`${action} laser lights.`);
    if (action === "Starting") {
        event.startLaserLights();
    } else {
        event.stopLaserLights();
    }
}
let number=0;
eventBus.on('entranceDoorMovement', () => {
    if(number==0){
        playPartyMusic();
        controlPartyLights("party");
        controlFogMachine("Starting");
        controlLaserLights("Starting");
        number++;
    }

});

eventBus.on('exitDoorMovement', () => {
    if(number==1){
        stopPartyMusic();
        controlPartyLights("normal");
        controlFogMachine("Stopping");
        controlLaserLights("Stopping");
        number--;
    }

});
"""

# Parse the JavaScript code and draw the CFG
nodes, edges = parse_js_code(js_code)
output_path = os.path.join(output_dir, 'cfg')
draw_cfg(nodes, edges, output_path)
print(f"CFG graph has been saved as {output_path}.png")
