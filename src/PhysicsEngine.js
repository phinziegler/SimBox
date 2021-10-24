import Vector from "./vector.js";

class SimulatedObject {
  constructor(physicsWorld, pos, size) {
    this.physicsObject = physicsWorld.createDynamicBody(planck.Vec2(pos.x, pos.y));
    this.physicsObject.createFixture(planck.Box((size.width/2)*PhysicsEngine.pixelsToMetersScalar, (size.height/2)*PhysicsEngine.pixelsToMetersScalar));

    this.renderSprite = new PIXI.Graphics();
    
    this.renderSprite.beginFill(0xFFFFFF);
    this.renderSprite.lineStyle(0, 0x000000);
    this.renderSprite.drawRect(0, 0, size.width, size.height);
    this.renderSprite.endFill();
    this.renderSprite.pivot.x = this.renderSprite.width / 2;
    this.renderSprite.pivot.y = this.renderSprite.height / 2;

    this.renderContainer = new PIXI.Container();
    this.renderContainer.addChild(this.renderSprite);
    //this.renderContainer.pivot.x = this.renderContainer.width / 2;
    //this.renderContainer.pivot.y = this.renderContainer.height / 2;
  } 
}

/* Main coordinator for running the physics simulation. */
export default class PhysicsEngine {
  static get metersToPixelsScalar() { return 100; }
  static get pixelsToMetersScalar() { return 1/PhysicsEngine.metersToPixelsScalar; }

  constructor() {
    this.renderer = new PIXI.Renderer({ 
      view: document.getElementById("simulationCanvas"),
      width: 800,
      height: 800,
      backgroundColor: 0x347bed
    });
    this.stage = new PIXI.Container();
    this.renderedObjectsContainer = new PIXI.Container();
    this.stage.addChild(this.renderedObjectsContainer);
    
    var defaultGravity = -10;
    this.physicsWorld = planck.World(planck.Vec2(0, defaultGravity));
   
    this.simulatedObjects = [];
    var box = new SimulatedObject(this.physicsWorld, {x: (this.renderer.width/2)*PhysicsEngine.pixelsToMetersScalar, y: (this.renderer.height/2)*PhysicsEngine.pixelsToMetersScalar}, {width: 795, height: 100});
    var box2 = new SimulatedObject(this.physicsWorld, {x: (this.renderer.width - 50)*PhysicsEngine.pixelsToMetersScalar, y: 0}, {width: 50, height: 100});
    this.addSimulatedObject(box);
    this.addSimulatedObject(box2);
    
    this.lastStepTimeStamp = null;    
    requestAnimationFrame(this.initialSimulationStep.bind(this));
  }

  initialSimulationStep(initialTimeStamp) {
    this.lastStepTimeStamp = initialTimeStamp;
    requestAnimationFrame(this.simulationStep.bind(this));
  }

  simulationStep(timeStamp) {
    var deltaTime = timeStamp - this.lastStepTimeStamp;
    this.lastStepTimeStamp = timeStamp;
      //console.log("step deltatime: " + deltaTime);
      this.physicsWorld.step(deltaTime / 1000);
      for (const simulatedObject of this.simulatedObjects){
          var simulationPos = simulatedObject.physicsObject.getPosition();
          var renderPos = this.simulationToRenderPos(simulationPos);
          simulatedObject.renderContainer.x = renderPos.x;
          simulatedObject.renderContainer.y = renderPos.y;
          //console.log("render pos: " + posToString(renderPos) + "\n" + "simulation pos: " + posToString(simulationPos));
          this.renderer.render(this.stage);
      }
      requestAnimationFrame(this.simulationStep.bind(this)); // Request next step.
  }

  simulationToRenderPos(simulationPos){
    return {x: simulationPos.x * PhysicsEngine.metersToPixelsScalar, y: this.renderer.height - simulationPos.y * PhysicsEngine.metersToPixelsScalar}
  }

  posToString(pos){
    return "(" + pos.x + ", " + pos.y + ")";
  }

  addSimulatedObject(simulatedObject){
    this.simulatedObjects.push(simulatedObject);
    this.renderedObjectsContainer.addChild(simulatedObject.renderContainer);
  }

}