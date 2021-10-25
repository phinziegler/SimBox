import SimulatedObjectBody from "./simulated-object-body.js";
import Simulator from "../simulator.js";
import Vector from "../vector.js";

/**
 * A border edge, which is essentially a rectangle that only maintains collision on a single edge.
 */
export default class BorderEdge extends SimulatedObjectBody {
  constructor(length, width, edgeSide, color) {
    super();
    this.length = length;
    this.width = width;
    this.edgeSide = edgeSide;
    this.color = color;

    this.rectWidth = null;
    this.rectHeight = null;
    if (this.edgeSide.y != 0) {
      this.rectWidth = this.length;
      this.rectHeight = this.width;
    }
    else if (this.edgeSide.x != 0) {
      this.rectWidth = this.width;
      this.rectHeight = this.length;
    }
  }

  getPhysicsEngineObject() {
    let startPos = null;
    let endPos = null;
    if (this.edgeSide.y != 0) {
      startPos = new Vector(-this.length/2, this.width/2 * this.edgeSide.y);
      endPos = new Vector(this.length/2, this.width/2 * this.edgeSide.y);
    }
    else if (this.edgeSide.x != 0) {
      startPos = new Vector(this.width/2 * this.edgeSide.x, -this.length/2);
      endPos = new Vector(this.width/2 * this.edgeSide.x, this.length/2);
    }
    //console.log(`Border from ${startPos} to ${endPos}`);
    return planck.Edge(planck.Vec2(startPos.x * Simulator.pixelsToMetersScalar, startPos.y * Simulator.pixelsToMetersScalar), planck.Vec2(endPos.x * Simulator.pixelsToMetersScalar, endPos.y * Simulator.pixelsToMetersScalar));
  }

  drawGraphicsObject() {
    var graphic = new PIXI.Graphics();
    graphic.beginFill(this.color);
    graphic.lineStyle(0, 0x000000);
    
    graphic.drawRect(0, 0, this.rectWidth, this.rectHeight);
    graphic.endFill();
    graphic.pivot.x = graphic.width / 2;
    graphic.pivot.y = graphic.height / 2;
    return graphic;
  }

  get boundingSize(){
    return new Vector(this.rectWidth, this.rectHeight);
  }
}