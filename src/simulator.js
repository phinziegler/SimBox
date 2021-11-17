import Vector from "./vector.js";
import SimulatedObject from "./simulated-object.js";
import Box from "./simulated-object-bodies/box.js";
import Circle from "./simulated-object-bodies/circle.js";
//import Cloth from "./simulated-object-bodies/cloth.js";
import Node from "./simulated-object-bodies/node.js";
import cEdge from "./simulated-object-bodies/edge.js";
import SimulatedObjectBody from "./simulated-object-bodies/simulated-object-body.js";
import Options from "./tools-and-input/options.js";
import { Edge, ExtremePosition } from "./vector.js";
import BorderEdge from "./simulated-object-bodies/border-edge.js";

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
    /**
     * List of simulated objects. At any point in time during simulation this list will contain the currently simulated objects.
     * @type {SimulatedObject[]}
     */
    this.simulatedObjects = [];
    
    this.initRenderer(simulationCanvas);
    this.initPhysicsEngine();
    /**
     * The options that dictate the simulation.
     * @type {Options}
     */
    this.options = new Options(this);
    this.startSimulator();
  }

  /**
   * Initializes the renderer of the simulator using PixiJS.
   */
  initRenderer(canvas) {
    /**
     * The canvas element that the simulation is rendered on.
     * @type {HTMLElement}
     */
    this.simulationCanvas = canvas;
    /**
     * The size of the simulated region in pixels.
     * @type {Vector}
     */
    this.simulationAreaSize = new Vector(800, 800);
    /**
    * PixiJS renderer instance.
    * @type {*}
    */
    this.renderer = new PIXI.Renderer({ 
      view: this.simulationCanvas,
      width: this.simulationAreaSize.x,
      height: this.simulationAreaSize.y,
      backgroundColor: 0x363636,
      antialias:true
    });
    /**
    * PixiJS stage for rendering.
    * @type {*}
    */
    this.stage = new PIXI.Container();
    /**
    * PixiJS container for render objects - rendered simulated objects are children of this container.
    * @type {*}
    */
    this.renderObjectsContainer = new PIXI.Container();
    this.stage.addChild(this.renderObjectsContainer);
  }
  /**
   * Initializes the physics engine of the simulator using Planck.js.
   */
  initPhysicsEngine() {
    /**
     * Plank.js World instance for containing physics objects simulated by Planck.js.
     * @type {*}
     */
    this.physicsWorld = planck.World(planck.Vec2(0, Options.DefaultOptions.GRAVITY));
  }
  /**
   * Starts the simulator by starting the simulator step loop.
   */
  startSimulator() {
    this.buildSimulationScene();
    /**
     * The time at the moment of the last simulation step, used for calculating delta time between simulation steps.
     * @type {number}
     */
    this.lastStepTimeStamp = null;   
    window.requestAnimationFrame(this.initialSimulationStep.bind(this));
  }

  /**
   * Builds the simulation scene by filling it with pre-defined simulated objects.
   */
  buildSimulationScene(){
    const borderWidth = 0;
    this.addStaticObjectAtExtremePos(ExtremePosition.BOTTOM_CENTER, new BorderEdge(this.simulationAreaSize.x - borderWidth*2, borderWidth, Edge.TOP, 0x00FF00));  // Floor
    this.addStaticObjectAtExtremePos(ExtremePosition.TOP_CENTER, new BorderEdge(this.simulationAreaSize.x - borderWidth*2, borderWidth, Edge.BOTTOM, 0x000000));  // Ceiling
    this.addStaticObjectAtExtremePos(ExtremePosition.MIDDLE_LEFT, new BorderEdge(this.simulationAreaSize.x, borderWidth, Edge.RIGHT, 0x000000));                  // Left
    this.addStaticObjectAtExtremePos(ExtremePosition.MIDDLE_RIGHT, new BorderEdge(this.simulationAreaSize.x, borderWidth, Edge.LEFT, 0x000000));                  // Right

    // this.addSimulatedObjectAtExtremePos(ExtremePosition.MIDDLE_CENTER, new Circle(100, 0x00FFFF));
    // this.addSimulatedObjectAtExtremePos(ExtremePosition.TOP_CENTER, new Box(200, 100, 0xFFFFFF));

    // Cloth 
    var cX = 220; 
    var cY = 100; 
    var mesh = 10; 
    var len = 40; 
    var nodes = []; 
    var edges = []; 

    for(var i = 0; i < len; i++){
      var v = new Vector(cX, cY); 
      var p = new Node(p); 
      this.addStaticObject(v, p); 
      nodes.push(p);
      cX = cX + mesh; 
    }
    this.addStaticObject(new Vector(220,100), new Box(mesh, 2, 0xFF0000));

    for(var i = 0; i < len-1; i++){
      var p1 = nodes[i]; 
      var p2 = nodes[i+1]; 
      //var e = new cEdge(p1.getV(), p2.getV(), 0xFF0000);
      //edges.push(e); 
    }
    
    /* Goal and Catapult Rendering 
    // Catapult
    this.addSimulatedObject(new Vector(195, 730), new Box(20, 50, 0xFFFFFF));   // fulcrum
    this.addSimulatedObject(new Vector(200, 680), new Box(200, 10, 0xFFFFFF));  // paddle for catapult
    this.addSimulatedObject(new Vector(110, 670), new Box(10,10, 0xFF0000));    // red box

    // Goal
    this.addSimulatedObject(new Vector(600, 590), new Box(25, 350, 0xFFFFFF));  // goal pillar
    this.addSimulatedObject(new Vector(600, 400), new Box(100, 10, 0xFFFFFF));  // goal bar
    this.addSimulatedObject(new Vector(555, 360), new Box(10, 40, 0xFFFFFF));   // goal fork left
    this.addSimulatedObject(new Vector(645, 360), new Box(10, 40, 0xFFFFFF));   // goal fork right
    */
  }
  
  /**
   * Adds a simulated object of a given simulated object body at a specified position.
   * @param {Vector} screenPos The position in screen space to add the object.
   * @param {SimulatedObjectBody} simulatedObjectBody The simulated object body to make up the object.
   */
  addSimulatedObject(screenPos, simulatedObjectBody) {
    this.addSimulatedObjectInternal(screenPos, simulatedObjectBody, "dynamic");
  }

  /**
   * Adds a simulated object at the given extreme position.
   * @param {Vector} extremePos 
   * @param {SimulatedObjectBody} simulatedObjectBody 
   */
  addSimulatedObjectAtExtremePos(extremePos, simulatedObjectBody){
    this.addSimulatedObjectAtExtremePosInternal(extremePos, simulatedObjectBody, "dynamic");
  }
  /**
   * Adds a static simulated object at given extreme screen position.
   * @param {Vector} screenPos 
   * @param {SimulatedObjectBody} simulatedObjectBody 
   */
  addStaticObject(screenPos, simulatedObjectBody){
    this.addSimulatedObjectInternal(screenPos, simulatedObjectBody, "static");
  }
  /**
   * Adds a static simulated object at given extreme screen position.
   * @param {Vector} extremePos 
   * @param {SimulatedObjectBody} simulatedObjectBody 
   */
  addStaticObjectAtExtremePos(extremePos, simulatedObjectBody){
    this.addSimulatedObjectAtExtremePosInternal(extremePos, simulatedObjectBody, "static");
  }
  /**
   * Adds simulated object of specified extreme position, body, and physics type.
   * @param {Vector} extremePos 
   * @param {SimulatedObjectBody} simulatedObjectBody 
   * @param {string} physicsType 
   */
   addSimulatedObjectAtExtremePosInternal(extremePos, simulatedObjectBody, physicsType){
    this.addSimulatedObjectInternal(simulatedObjectBody.getScreenExtremePos(this.simulationAreaSize, extremePos), simulatedObjectBody, physicsType);
  }

  /**
   * The initial simulation step of the simulation. This initial step is distinct from the usual simulation step, as it provides the delta time of the next real simulation step.
   * @param {number} initialTimeStamp The time at which the initial simulation step was called.
   */
  initialSimulationStep(initialTimeStamp) {
    this.lastStepTimeStamp = initialTimeStamp;
    window.requestAnimationFrame(this.simulationStep.bind(this));
  }

  /**
   * A simulation step in the simulation loop. Each step calls a request for the next simulation step, effectively forming a loop of simulation steps.
   * @param {number} timeStamp The time at which the simulation step was called.
   */
  simulationStep(timeStamp) {
    var deltaTime = timeStamp - this.lastStepTimeStamp;
    this.lastStepTimeStamp = timeStamp;
    this.physicsWorld.step((deltaTime / 1000) * this.options.speed.value * !this.options.isPaused.value); // SPEED AND PAUSE IMPLEMENTED HERE

    for (const simulatedObject of this.simulatedObjects) {
      simulatedObject.updateRenderTransform(this.simulationAreaSize);
    }

    this.renderSimulation();
    window.requestAnimationFrame(this.simulationStep.bind(this)); // Request next step.
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
  addSimulatedObjectInternal(screenPos, simulatedObjectBody, physicsType) {
    const simulationPos = screenPos.screenToSimulationPos(this.simulationAreaSize)
    const simulatedObject = new SimulatedObject(this.physicsWorld, simulationPos, simulatedObjectBody, physicsType);
    this.simulatedObjects.push(simulatedObject);
    this.renderObjectsContainer.addChild(simulatedObject.renderContainer);
  }
}