import Simulator from "./simulator.js";

global.PIXI = jest.fn();
global.PIXI.Renderer = jest.fn(() => {
  return {};
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

global.window = global; // Mock 'window' as the global namespace as it is in a typical JS environment.
global.window.requestAnimationFrame = jest.fn();

const { JSDOM } = require("jsdom");


describe("Simulator", () => {
  beforeAll(() => {
    return JSDOM.fromFile("./index.html").then((dom) => { // Importantly, the scripts inside the html should not be loaded by JSDOM by default.
      global.document = dom.window.document;
    });
  });
  test("should set canvas through constructor", () => {
    const canvas = document.getElementById("canvas");
    console.log(document.getElementsByTagName("script"))
    const simulator = new Simulator(canvas);
    expect(simulator.simulationCanvas).toEqual(canvas);
  });
});