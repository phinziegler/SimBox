import SimulatedObjectBody from "./simulated-object-body.js";
import Simulator from "../simulator.js";
import Vector from "../vector.js";
import Node from "./node.js"; 
import Edge from "./edge.js"; 

var nodeArray = []; 
var edgeArray = []; 

export default class Cloth extends SimulatedObjectBody {
    constructor(color) {
        super();
        this.color = color;
      }
    
      getPhysicsEngineObject() {
        return planck.Circle(this.radius * Simulator.pixelsToMetersScalar);
      }
    
      drawGraphicsObject() {
        var graphic = new PIXI.Graphics();
        graphic.beginFill(this.color);
        graphic.lineStyle(1, this.color);
        graphic.drawCircle(0, 0, this.radius);
        graphic.endFill();
        return graphic;
      }
    
      get boundingSize(){
        return new Vector(this.radius*2, this.radius*2);
    }
}