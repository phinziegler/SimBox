import Vector from "../vector.js";

/**
 * A simulated object body that defines the body geometry of a simulated object.
 * @abstract
 */
export default class SimulatedObjectBody {
  constructor() {
    if (this.constructor == SimulatedObjectBody) {
      throw new Error("Abstract classes cannot be instantiated.");
    }
  }

  init() {
    this.physicsEngineObject = this.createPhysicsEngineObject();
  }

  /**
   * Creates the physics engine object of this body.
   * @abstract
   */
   createPhysicsEngineObject() {
    throw new Error("Method 'createPhysicsEngineObject()' must be implemented.");
  }
  /**
   * Draws and returns the graphics object of this body. 
   * @abstract
   */
  drawGraphicsObject() {
    throw new Error("Method 'drawGraphicsObject()' must be implemented.");
  }

  getScreenExtremePos(screenDimensions, extremePos) {
    const centerScreenPos = new Vector(screenDimensions.x/2, screenDimensions.y/2);
    const boundingSize = this.boundingSize;
    const margins = new Vector(boundingSize.x/2, boundingSize.y/2);
    const boundedScreenArea = new Vector(screenDimensions.x - margins.x * 2, screenDimensions.y - margins.y * 2);
    const extremeBoundedScreenArea = new Vector(centerScreenPos.x + (boundedScreenArea.x/2 * extremePos.x), centerScreenPos.y - (boundedScreenArea.y/2 * extremePos.y));
    //console.log("calculated extreme pos: " + extremeBoundedScreenArea);
    return extremeBoundedScreenArea;
  }

  get boundingSize() {
    throw new Error("'boundingSize' must be implemented.");
  }
}