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

  /**
   * Gets the physics engine object of this body.
   * @abstract
   */
  getPhysicsEngineObject() {
    throw new Error("Method 'getPhysicsEngineObject()' must be implemented.");
  }
  /**
   * Draws and returns the graphics object of this body. 
   * @abstract
   */
  drawGraphicsObject() {
    throw new Error("Method 'drawGraphicsObject()' must be implemented.");
  }
}