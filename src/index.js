import Simulator from "./simulator.js";
import InputHandler from "./tools-and-input/input-handler.js";

window.addEventListener("load", startSimulation);

function startSimulation(){
    const simulationCanvas = document.getElementById("simulationCanvas");

    // Instantiate primary objects.
    const simulator = new Simulator(simulationCanvas);
    new InputHandler(simulator);
}