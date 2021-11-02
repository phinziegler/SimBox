import Simulator from "./simulator.js";
import Options from "./tools-and-input/options.js";

global.PIXI = jest.fn();
global.PIXI.Renderer = jest.fn(() => {
  return {
    render: jest.fn()
  };
});
global.PIXI.Container = jest.fn(() => {
  return {
    addChild: jest.fn()
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
      canvas = document.getElementById("canvas");
      simulator = new Simulator(canvas);
    });
  });
  afterAll(() => {
    console.log("animation frames count: " + requestAnimationFrameCount);
  });
  test("should set canvas through constructor", () => {
    expect(simulator.simulationCanvas).toEqual(canvas);
  });

  test("should construct and set options through constructor", () => {
    expect(simulator.options).toBeInstanceOf(Options);
  });

  test("should set gravity with correct negativity on gravity input field change", () => {
    const newValue = 5;
    const gravityElement = document.getElementById("gravity");
    gravityElement.value = newValue;
    var event = new window.Event("input", {
      bubbles: true,
      cancelable: true,
    });
    gravityElement.dispatchEvent(event);
    expect(simulator.options.gravity.value).toEqual(-newValue);
  });

  test("should not set invalid input for gravity", () => {
    const previousValue = simulator.options.gravity.value;
    const newValue = "invalid, this is text, not a number";
    const gravityElement = document.getElementById("gravity");
    gravityElement.value = newValue;
    var event = new window.Event("input", {
      bubbles: true,
      cancelable: true,
    });
    gravityElement.dispatchEvent(event);
    expect(simulator.options.gravity.value).toEqual(previousValue);
  });

  test("should set speed on speed input field change", () => {
    const newValue = 5;
    const speedElement = document.getElementById("speed");
    speedElement.value = newValue;
    var event = new window.Event("input", {
      bubbles: true,
      cancelable: true,
    });
    speedElement.dispatchEvent(event);
    expect(simulator.options.speed.value).toEqual(newValue);
  });

  test("should set isPaused on pause checkbox change", () => {
    const newValue = true;
    const isPausedElement = document.getElementById("pause");
    isPausedElement.checked = newValue;
    var event = new window.Event("change", {
      bubbles: true,
      cancelable: true,
    });
    isPausedElement.dispatchEvent(event);
    expect(simulator.options.isPaused.value).toEqual(newValue);
  });
});