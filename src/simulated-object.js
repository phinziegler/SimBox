import Vector from "./vector.js";
import Simulator from "./simulator.js";

/**
 * A simulated object of the physics simulation.
 */
export default class SimulatedObject {
  /**
   * Create a simulated object.
   * @param {*} physicsWorld The Planck.js physics world to create the physics object in.
   * @param {Vector} pos The position to create the simulated object at.
   * @param {Vector} size The size of the simulated object.
   */
  constructor(physicsWorld, pos, size) {
    this.physicsObject = physicsWorld.createDynamicBody(planck.Vec2(pos.x, pos.y));
    this.physicsObject.createFixture(planck.Box((size.x/2)*Simulator.pixelsToMetersScalar, (size.y/2)*Simulator.pixelsToMetersScalar));

    this.renderSprite = new PIXI.Graphics();
    
    this.renderSprite.beginFill(0xFFFFFF);
    this.renderSprite.lineStyle(0, 0x000000);

    this.renderSprite.drawRect(0, 0, size.x, size.y);
    this.renderSprite.endFill();
    this.renderSprite.pivot.x = this.renderSprite.width / 2;
    this.renderSprite.pivot.y = this.renderSprite.height / 2;

    this.renderContainer = new PIXI.Container();
    this.renderContainer.addChild(this.renderSprite);
    //this.renderContainer.pivot.x = this.renderContainer.x / 2;
    //this.renderContainer.pivot.y = this.renderContainer.y / 2;
  }

  /**
   * Updates the graphical properties of the simulated object, syncing its rendered geometry with the current kinematic properties of the physics engine's respective object.
   * @param {Vector} simulationAreaSize The size in pixels of the simulation area.
   */
  updateRenderTransform(simulationAreaSize){
    // Update position.
    var simulationPos = Vector.fromObject(this.physicsObject.getPosition());
    var renderPos = simulationPos.simulationToRenderPos(simulationAreaSize);
    this.renderContainer.x = renderPos.x;
    this.renderContainer.y = renderPos.y;

    // Update rotation.
    var rotationAngle = this.physicsObject.getAngle();
    this.renderContainer.rotation = rotationAngle;

    //console.log("render pos: " + renderPos + "\n" + "simulation pos: " + simulationPos + "\n" + "rotation angle: " + rotationAngle);
  }
}