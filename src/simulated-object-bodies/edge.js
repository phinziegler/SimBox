import SimulatedObjectBody from "./simulated-object-body.js";
import Vector from "../vector.js";
import Box from "./box.js";

export default class edge extends Box {
    constructor(width, color){
        super(width, 2, color); 
    }
}