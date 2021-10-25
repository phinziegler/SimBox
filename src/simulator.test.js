import Simulator from "./simulator.js";

global.PIXI = jest.fn();
global.PIXI.Renderer = jest.fn().mockImplementation(() => {
  return {
    
  };
});
global.PIXI.Container = jest.fn().mockImplementation(() => {
  return {
    addChild: jest.fn()
  };
});
global.PIXI.Graphics = jest.fn().mockImplementation(() => {
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

const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const document = new JSDOM("<!DOCTYPE html>").window.document;



describe("Simulator", () => {
  test("should set canvas through constructor", () => {
    const mockCanvas = document.createElement("canvas");
    const simulator = new Simulator(mockCanvas);
    expect(simulator.simulationCanvas).toEqual(mockCanvas);
  });
});