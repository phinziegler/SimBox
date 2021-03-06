import SimulatedObjectBody from "./simulated-object-body.js";
import Simulator from "../simulator.js";
import Vector from "../vector.js";

/**
 * Simple shape rectangular box body.
 */
export default class Box extends SimulatedObjectBody {
  constructor(width, height, color) {
    super();
    this.width = width;
    this.height = height;
    this.color = color;
    this.init();
  }

  createPhysicsEngineObject() {
    return planck.Box((this.width/2)*Simulator.pixelsToMetersScalar, (this.height/2)*Simulator.pixelsToMetersScalar);
  }

  drawGraphicsObject() {
    var graphic = new PIXI.Graphics();
    graphic.beginFill(this.color);
    graphic.lineStyle(1, this.color);
    graphic.drawRect(0, 0, this.width, this.height);
    graphic.endFill();
    graphic.pivot.x = graphic.width / 2;
    graphic.pivot.y = graphic.height / 2;
    return graphic;
  }

  get boundingSize(){
    return new Vector(this.width, this.height);
  }
}