import SimulatedObjectBody from "./simulated-object-bodies/simulated-object-body.js";
import Vector from "./vector.js";

/**
 * A simulated object of the physics simulation.
 */
export default class SimulatedObject {
  /**
   * Create a simulated object.
   * @param {*} physicsWorld 
   * @param {Vector} simulationPos Position in simulation space to construct the simulated object at.
   * @param {SimulatedObjectBody} simulatedObjectBody The simulated object body that defines the body of the simulated object.
   * @param {string} physicsType The type of physics body to be created.
   */
  constructor(physicsWorld, simulationPos, simulatedObjectBody, physicsType) {
    this.simulatedObjectBody = simulatedObjectBody;

    this.physicsEngineBody = physicsWorld.createBody({
      type: physicsType,
      allowSleep: false, // Avoids gravity not affecting asleep bodies.
      position: planck.Vec2(simulationPos.x, simulationPos.y)
    });
    this.physicsEngineBody.createFixture(simulatedObjectBody.physicsEngineObject, { density: 1 });
    
    this.renderContainer = new PIXI.Container();
    this.renderContainer.addChild(simulatedObjectBody.drawGraphicsObject());

    this.isPinned = false;
  }

  get isPinned() {
    return this._isPinned;
  }
  set isPinned(isPinned) {
    this._isPinned = isPinned;
    this.physicsEngineBody.setGravityScale(isPinned ? 0 : 1);
  }

  /**
   * Updates the graphical properties of the simulated object, syncing its rendered geometry with the current kinematic properties of the physics engine's respective object.
   * @param {Vector} simulationAreaSize The size in pixels of the simulation area.
   */
  updateRenderTransform(simulationAreaSize){
    // Update position.
    var simulationPos = Vector.fromObject(this.physicsEngineBody.getPosition());
    var renderPos = simulationPos.simulationToScreenPos(simulationAreaSize);
    this.renderContainer.x = renderPos.x;
    this.renderContainer.y = renderPos.y;

    // Update rotation.
    var rotationAngle = -this.physicsEngineBody.getAngle(); // NOTE - Look into the library specifics of why rotation has to be negative from physics to rendering.
    this.renderContainer.rotation = rotationAngle;

    //console.log("render pos: " + renderPos + "\n" + "simulation pos: " + simulationPos + "\n" + "rotation angle: " + rotationAngle);
  }
}