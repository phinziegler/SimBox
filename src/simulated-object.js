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
   */
  constructor(physicsWorld, simulationPos, simulatedObjectBody) {
    this.simulatedObjectBody = simulatedObjectBody;

    this.physicsObject = physicsWorld.createDynamicBody(planck.Vec2(simulationPos.x, simulationPos.y));
    this.physicsObject.createFixture(simulatedObjectBody.getPhysicsEngineObject());
    
    this.renderContainer = new PIXI.Container();
    this.renderContainer.addChild(simulatedObjectBody.drawGraphicsObject());
  }

  /**
   * Updates the graphical properties of the simulated object, syncing its rendered geometry with the current kinematic properties of the physics engine's respective object.
   * @param {Vector} simulationAreaSize The size in pixels of the simulation area.
   */
  updateRenderTransform(simulationAreaSize){
    // Update position.
    var simulationPos = Vector.fromObject(this.physicsObject.getPosition());
    var renderPos = simulationPos.simulationToScreenPos(simulationAreaSize);
    this.renderContainer.x = renderPos.x;
    this.renderContainer.y = renderPos.y;

    // Update rotation.
    var rotationAngle = this.physicsObject.getAngle();
    this.renderContainer.rotation = rotationAngle;

    //console.log("render pos: " + renderPos + "\n" + "simulation pos: " + simulationPos + "\n" + "rotation angle: " + rotationAngle);
  }
}