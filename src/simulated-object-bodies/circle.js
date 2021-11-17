import SimulatedObjectBody from "./simulated-object-body.js";
import Simulator from "../simulator.js";
import Vector from "../vector.js";

/**
 * Simple shape circle body.
 */
export default class Circle extends SimulatedObjectBody {
  constructor(radius, color) {
    super();
    this.radius = radius;
    this.color = color;
    this.init();
  }

  createPhysicsEngineObject() {
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