import Simulator from "./simulator.js";
import InputHandler from "./tools-and-input/input-handler.js";

window.addEventListener("load", startSimulation);

function startSimulation() {
    const simulationCanvas = document.getElementById("simulationCanvas");
    const simulator = new Simulator(simulationCanvas); // Instantiate simulator to present SimBox on the simulation canvas.
    new InputHandler(simulator); // Keep the input handler instantiation outside of the simulator, as it is more proper since simulations need not necessarily have input handlers (for example they can work off simulated scenes alone).
}