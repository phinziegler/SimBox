// TOOL MENU
let tool = document.getElementById("toolButton");
let toolMenu = document.getElementById("tools");
tool.addEventListener("click", () => {
    toggleMenu(toolMenu);
});

// OPTION MENU
let option = document.getElementById("optionButton");
let optionMenu = document.getElementById("options");
option.addEventListener("click", () => {
    toggleMenu(optionMenu);
});

// TOGGLE MENU FUNCTION
function toggleMenu(element) {
    if(element.className == "open") {
        element.setAttribute("class", "closed");
    }
    else {
        element.setAttribute("class", "open");
    }
}

class SimulatedObject {
    constructor(pos, size) {
        this.physicsObject = physicsWorld.createDynamicBody(planck.Vec2(pos.x, pos.y));
        this.physicsObject.createFixture(planck.Box((size.width/2)*pixelsToMetersScalar, (size.height/2)*pixelsToMetersScalar));

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
		renderedObjectsContainer.addChild(this.renderContainer);
    } 
}

const metersToPixelsScalar = 100;
const pixelsToMetersScalar = 1/metersToPixelsScalar;

const renderer = new PIXI.Renderer({ 
    view: document.getElementById("simulationCanvas"),
    width: 800,
    height: 800,
    backgroundColor: 0x347bed
});
var stage = new PIXI.Container();
var renderedObjectsContainer = new PIXI.Container();
stage.addChild(renderedObjectsContainer);

var defaultGravity = -10;
var physicsWorld = planck.World(planck.Vec2(0, defaultGravity));

var box = new SimulatedObject({x: (renderer.width/2)*pixelsToMetersScalar, y: (renderer.height/2)*pixelsToMetersScalar}, {width: 795, height: 100});
var box2 = new SimulatedObject({x: (renderer.width - 50)*pixelsToMetersScalar, y: 0}, {width: 50, height: 100});

var simulatedObjects = [];
simulatedObjects.push(box);
simulatedObjects.push(box2);

var lastStepTimeStamp;
requestAnimationFrame(initialSimulationStep);
function initialSimulationStep(initialTimeStamp) {
    lastStepTimeStamp = initialTimeStamp;
    requestAnimationFrame(simulationStep);
}
function simulationStep(timeStamp) {
	var deltaTime = timeStamp - lastStepTimeStamp;
    lastStepTimeStamp = timeStamp;
    //console.log("step deltatime: " + deltaTime);
    physicsWorld.step(deltaTime / 1000);
    for (const simulatedObject of simulatedObjects){
        var simulationPos = simulatedObject.physicsObject.getPosition();
        var renderPos = simulationToRenderPos(simulationPos);
        simulatedObject.renderContainer.x = renderPos.x;
        simulatedObject.renderContainer.y = renderPos.y;
        //console.log("render pos: " + posToString(renderPos) + "\n" + "simulation pos: " + posToString(simulationPos));
        renderer.render(stage);
    }
    requestAnimationFrame(simulationStep); // Request next step.
}

function simulationToRenderPos(simulationPos){
    return {x: simulationPos.x * metersToPixelsScalar, y: renderer.height - simulationPos.y * metersToPixelsScalar}
}
function posToString(pos){
    return "(" + pos.x + ", " + pos.y + ")";
}

/* // Testbed basic functionality:
planck.testbed(function(testbed) {
    // Your testbed code
    var pl = planck, Vec2 = pl.Vec2;

    var world = pl.World(Vec2(0, 0));

    testbed.height = 80;
    testbed.y = 0;

    console.log(testbed.width);
    console.log(testbed);

    var bar = world.createBody();
    // floor
    bar.createFixture(pl.Edge(Vec2(-testbed.width/2, -testbed.height/2), Vec2(testbed.width/2, -testbed.height/2)));
    // ceiling
    bar.createFixture(pl.Edge(Vec2(-testbed.width/2, testbed.height/2), Vec2(testbed.width/2, testbed.height/2)));
    // left wall
    bar.createFixture(pl.Edge(Vec2(-testbed.width/2, -testbed.height/2), Vec2(-testbed.width/2, testbed.height/2)));
    // right wall
    bar.createFixture(pl.Edge(Vec2(testbed.width/2, -testbed.height/2), Vec2(testbed.width/2, testbed.height/2)));

        var box = world.createBody().setDynamic();
        box.createFixture(pl.Box(0.5, 0.5));
        box.setPosition(Vec2(1, 1 + 20));
        box.setMassData({
            mass : 1,
            center : Vec2(),
            I : 1
        })

    return world
});
*/