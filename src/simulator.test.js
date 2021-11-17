
import Simulator from "./simulator.js";
import InputHandler from "./tools-and-input/input-handler.js";
import Options from "./tools-and-input/options.js";
import Vector from "./vector.js";
import Circle from "./simulated-object-bodies/circle.js";
import Box from "./simulated-object-bodies/box.js";

global.PIXI = jest.fn();
global.PIXI.Renderer = jest.fn(() => {
  return {
    render: jest.fn()
  };
});
global.PIXI.Container = jest.fn(() => {
  return {
    addChild: jest.fn(),
    removeChild: jest.fn()
  };
});
global.PIXI.Graphics = jest.fn(() => {
  return {
    beginFill: jest.fn(),
    lineStyle: jest.fn(),
    drawRect: jest.fn(),
    drawCircle: jest.fn(),
    endFill: jest.fn(),
    pivot: jest.fn()
  };
});

global.planck = require('planck-js');

//global.window = global; // Mock 'window' as the global namespace as it is in a typical JS environment.
//global.window.requestAnimationFrame = jest.fn();

const { JSDOM } = require("jsdom");

describe("Simulator", () => {
  let canvas;
  let simulator;
  let inputHandler;
  let requestAnimationFrameCount = 0;

  beforeAll(() => { // Async/await functions fail on my end.
    return JSDOM.fromFile("./index.html").then((dom) => { // Importantly, the scripts inside the html should not be loaded by JSDOM by default.
      global.window = dom.window;
      global.document = dom.window.document;
      global.window.requestAnimationFrame = function (callback) {
        if (++requestAnimationFrameCount < 10){
          return callback();
        }
      };
      canvas = document.getElementById("simulationCanvas");
      canvas.width = 800;
      canvas.height = 800;
      canvas.getBoundingClientRect = jest.fn(() => {
        return {
          width: 800,
          height: 800,
          left: 0,
          top: 0
        };
      });
      simulator = new Simulator(canvas);
      inputHandler = new InputHandler(simulator);
    });
  });

  function emulateMouseDragCompletion(dragWidth, dragHeight, toolId) {
    emulateMouseDragCompletionAtPos(0, 0, dragWidth, dragHeight, toolId);
  }
  function emulateMouseDragCompletionAtPos(dragLeftPos, dragTopPos, dragWidth, dragHeight, toolId) {
    inputHandler.toolsHandler.activeTool = toolId;
    let canvasBoundingRect = canvas.getBoundingClientRect();
    const startX = canvasBoundingRect.left + dragLeftPos;
    const startY = canvasBoundingRect.top + dragTopPos;
    const endX = startX + dragWidth;
    const endY = startY + dragHeight;
    const mouseDownE = new window.MouseEvent("mousedown", {
      clientX: startX,
      clientY: startY,
      bubbles: true,
      cancelable: true
    });
    const mouseMoveE = new window.MouseEvent("mousemove", {
      clientX: endX,
      clientY: endY,
      bubbles: true,
      cancelable: true
    });
    const mouseUpE = new window.MouseEvent("mouseup", {
      clientX: endX,
      clientY: endY,
      bubbles: true,
      cancelable: true
    });
    canvas.dispatchEvent(mouseDownE);
    canvas.dispatchEvent(mouseMoveE);
    canvas.dispatchEvent(mouseUpE);
  }


  describe("Object Creation", () => {
    test("should place simulated object from mouse input", () => {
      const previousSimulatedObjectsCount = simulator.simulatedObjects.length;
      emulateMouseDragCompletion(100, 100, "rectangle");
      const newSimulatedObjectsCount = simulator.simulatedObjects.length;
      console.log("before: " + previousSimulatedObjectsCount + ", after: " + newSimulatedObjectsCount);
      expect(newSimulatedObjectsCount == (previousSimulatedObjectsCount + 1)).toBeTruthy();
    });

    test("should place simulated object from mouse input with correct size", () => {
      const dragWidth = 200;
      const dragHeight = 100;
      emulateMouseDragCompletion(dragWidth, dragHeight, "rectangle");
      const simulatedObjBody = simulator.simulatedObjects[simulator.simulatedObjects.length - 1].simulatedObjectBody;
      expect(simulatedObjBody.width == dragWidth && simulatedObjBody.height == dragHeight).toBeTruthy();
    });
  });

  describe("Time Manipulation", () => {
    test("should set speed on speed input field change", () => {
      const newValue = 5;
      const speedElement = document.getElementById("speed");
      speedElement.value = newValue;
      var event = new window.Event("input", { bubbles: true, cancelable: true });
      speedElement.dispatchEvent(event);
      expect(simulator.options.speed.value).toEqual(newValue);
    });

    function setPauseValue(newPauseValue){
      const isPausedElement = document.getElementById("pause");
      isPausedElement.checked = newPauseValue;
      var event = new window.Event("change", { bubbles: true, cancelable: true });
      isPausedElement.dispatchEvent(event);
      expect(simulator.options.isPaused.value).toEqual(newPauseValue);
    }
    test("should pause simulation when pause button is clicked", () => {
      setPauseValue(true);
    });
    test("should resume simulation when pause button is clicked", () => {
      setPauseValue(false);
    });

    test("should end the simulation when the end button is clicked", () => {
      document.getElementById("end").click();
      expect(simulator.isEnded).toEqual(true);
    });
  });

  describe("Gravity", () => {
    beforeAll(() => {
      simulator.clearSimulatedObjects();
    });
    function setGravity(newValue){
      const gravityElement = document.getElementById("gravity");
      gravityElement.value = newValue;
      var event = new window.Event("input", { bubbles: true, cancelable: true });
      gravityElement.dispatchEvent(event);
    }
    test("should set gravity with correct negativity on gravity input field change", () => {
      const newValue = 5;
      setGravity(newValue);
      expect(simulator.options.gravity.value).toEqual(-newValue);
    });
  
    test("should not set invalid input for gravity", () => {
      const previousValue = simulator.options.gravity.value;
      const newValue = "invalid, this is text, not a number";
      setGravity(newValue);
      expect(simulator.options.gravity.value).toEqual(previousValue);
    });

    test("pinned objects should not be affected by gravity", () => {
      emulateMouseDragCompletion(100, 100, "rectangle");
      const simulatedObj = simulator.simulatedObjects[simulator.simulatedObjects.length - 1];
      const startPos = simulatedObj.simulationPos;
      simulatedObj.isPinned = true;
      setGravity(9);
      for (var i = 0; i < 1000; i++){
        simulator.physicsWorld.step(0.005);
      }
      const endPos = simulatedObj.simulationPos;
      console.log("falling object test: " + startPos + " - " + endPos + " - " + simulator.simulatedObjects.length);
      expect(Math.abs(startPos.x - endPos.x) < 0.1 && Math.abs(startPos.y - endPos.y) < 0.1).toBeTruthy();
    });
  });

  describe("Rigid Body", () => {
    beforeEach(() => {
      simulator.clearSimulatedObjects();
    });
    test("should create a circle from click and drag with circle tool", () => {
      emulateMouseDragCompletion(100, 100, "circle");
      const simulatedObjBody = simulator.simulatedObjects[simulator.simulatedObjects.length - 1].simulatedObjectBody;
      expect(simulatedObjBody instanceof Circle).toBeTruthy();
    });
    test("should create a rectangle from click and drag with rectangle tool", () => {
      emulateMouseDragCompletion(100, 100, "rectangle");
      const simulatedObjBody = simulator.simulatedObjects[simulator.simulatedObjects.length - 1].simulatedObjectBody;
      expect(simulatedObjBody instanceof Box).toBeTruthy();
    });
    test("rigid bodies should collide with one another", () => {
      emulateMouseDragCompletionAtPos(0, 300, 100, 100, "rectangle");
      emulateMouseDragCompletionAtPos(0, 100, 100, 100, "rectangle");
      const simulatedBodyA = simulator.simulatedObjects[simulator.simulatedObjects.length - 2];
      const simulatedBodyB = simulator.simulatedObjects[simulator.simulatedObjects.length - 1];
      //console.log("B: " + simulatedBodyA.simulationPos + " - " + simulatedBodyB.simulationPos + " -- " + simulator.simulatedObjects.length + " - " + simulator.options.gravity.value);
      for (var i = 0; i < 1000; i++){
        simulator.physicsWorld.step(0.005);
      }
      //console.log("A: " + simulatedBodyA.simulationPos + " - " + simulatedBodyB.simulationPos);
      expect(simulatedBodyB.simulationPos.y > simulatedBodyA.simulationPos.y).toBeTruthy();
    });
  });
});