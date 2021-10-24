import SimulatedObjectBody from "./simulated-object-body.js";
import Simulator from "../simulator.js";

/**
 * Simple shape circle body.
 */
export default class Circle extends SimulatedObjectBody {
  constructor(radius, color) {
    super();
    this.radius = radius;
    this.color = color;
  }

  getPhysicsEngineObject() {
    return planck.Circle(this.radius * Simulator.pixelsToMetersScalar);
  }

  drawGraphicsObject() {
    var graphic = new PIXI.Graphics();
    graphic.beginFill(this.color);
    graphic.lineStyle(0, 0x000000);
    graphic.drawCircle(0, 0, this.radius);
    graphic.endFill();
    return graphic;
  }
}