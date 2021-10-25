import Vector from "./vector.js";
import SimulatedObject from "./simulated-object.js";
import Box from "./simulated-object-bodies/box.js";
import Circle from "./simulated-object-bodies/circle.js";
import SimulatedObjectBody from "./simulated-object-bodies/simulated-object-body.js";

/**
 * A physics simulator that serves as the main coordinator for a physics simulation.
 */
export default class Simulator {
  /**
   * The number of pixels per meter. Serves as the scalar value for converting from meters to pixels when converting from screen to simulation space.
   * @type {number}
   */
  static get metersToPixelsScalar() { return 100; }
  /**
   * The number of meters per pixel. Serves as the scalar value for converting from pixels to meters when converting from simulation to screen space.
   * @type {number}
   */
  static get pixelsToMetersScalar() { return 1/Simulator.metersToPixelsScalar; }

  /**
   * Create a physics engine and start simulating.
   * @param {HTMLElement} simulationCanvas Canvas element to render the simulation on.
   */
  constructor(simulationCanvas) {
    this.initRenderer();
    this.initPhysicsEngine();
    /**
     * List of simulated objects. At any point in time during simulation this list will contain the currently simulated objects.
     */
    this.simulatedObjects = [];
    this.startSimulator();
  }
  /**
   * Initializes the renderer of the simulator using PixiJS.
   */
  initRenderer() {
    /**
     * The size of the simulated region in pixels.
     */
     this.simulationAreaSize = new Vector(800, 800);
     /**
      * PixiJS renderer instance.
      */
     this.renderer = new PIXI.Renderer({ 
       view: simulationCanvas,
       width: this.simulationAreaSize.x,
       height: this.simulationAreaSize.y,
       backgroundColor: 0x363636
     });
     /**
      * PixiJS stage for rendering.
      */
     this.stage = new PIXI.Container();
     /**
      * PixiJS container for render objects - rendered simulated objects are children of this container.
      */
     this.renderObjectsContainer = new PIXI.Container();
     this.stage.addChild(this.renderObjectsContainer);
  }
  /**
   * Initializes the physics engine of the simulator using Planck.js.
   */
  initPhysicsEngine() {
    const defaultGravity = -10;
    /**
     * Plank.js World instance for containing physics objects simulated by Planck.js.
     */
    this.physicsWorld = planck.World(planck.Vec2(0, defaultGravity));
  }
  /**
   * Starts the simulator by starting the simulator step loop.
   */
  startSimulator(){
    /**
     * The time at the moment of the last simulation step, used for calculating delta time between simulation steps.
     */
     this.lastStepTimeStamp = null;    
     requestAnimationFrame(this.initialSimulationStep.bind(this));
     this.debugAddSimulatedObjects();
  }
  
  /**
   * Adds simulated objects for visual confirmation of functionality.
   */
  debugAddSimulatedObjects() {
    const centerOfScreenPos = new Vector((this.renderer.width/2), (this.renderer.height/2));
    const topRightOfScreenPos = new Vector((this.renderer.width), 0);

    this.addSimulatedObject(centerOfScreenPos, new Box(790, 100, 0xFFFFFF));
    this.addSimulatedObject(topRightOfScreenPos, new Circle(100, 0x00FFFF));
  }
  
  /**
   * Adds a simulated object of a given simulated object body at a specified position.
   * @param {Vector} screenPos The position in screen space to add the object.
   * @param {SimulatedObjectBody} simulatedObjectBody The simulated object body to make up the object.
   */
  addSimulatedObject(screenPos, simulatedObjectBody) {
    const simulationPos = screenPos.screenToSimulationPos(this.simulationAreaSize);
    this.addSimulatedObjectInternal(new SimulatedObject(this.physicsWorld, simulationPos, simulatedObjectBody));
  }

  /**
   * The initial simulation step of the simulation. This initial step is distinct from the usual simulation step, as it provides the delta time of the next real simulation step.
   * @param {number} initialTimeStamp The time at which the initial simulation step was called.
   */
  initialSimulationStep(initialTimeStamp) {
    this.lastStepTimeStamp = initialTimeStamp;
    requestAnimationFrame(this.simulationStep.bind(this));
  }

  /**
   * A simulation step in the simulation loop. Each step calls a request for the next simulation step, effectively forming a loop of simulation steps.
   * @param {number} timeStamp The time at which the simulation step was called.
   */
  simulationStep(timeStamp) {
    var deltaTime = timeStamp - this.lastStepTimeStamp;
    this.lastStepTimeStamp = timeStamp;
    //console.log("step deltatime: " + deltaTime);
    this.physicsWorld.step(deltaTime / 1000);
    for (const simulatedObject of this.simulatedObjects)
      simulatedObject.updateRenderTransform(this.simulationAreaSize);
    this.renderSimulation();
    requestAnimationFrame(this.simulationStep.bind(this)); // Request next step.
  }

  /**
   * Renders the simulation.
   */
  renderSimulation() {
    this.renderer.render(this.stage); // Render via PixiJS renderer.
  }

  /**
   * Adds a simulated object to the simulation.
   * @param {SimulatedObject} simulatedObject 
   */
  addSimulatedObjectInternal(simulatedObject) {
    this.simulatedObjects.push(simulatedObject);
    this.renderObjectsContainer.addChild(simulatedObject.renderContainer);
  }
}