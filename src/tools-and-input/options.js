import Gravity from "./gravity.js";
import IsPaused from "./is-paused.js";
import Speed from "./speed.js";

const DefaultOptions = {
  GRAVITY: -9.81,
  SPEED: 1,
  IS_PAUSED: false
}

export default class Options {
  static get DefaultOptions() {
    return DefaultOptions;
  }

  constructor(simulator) {
    this.simulator = simulator;

    this.gravity = new Gravity(simulator, DefaultOptions.GRAVITY);
    this.speed = new Speed(simulator, DefaultOptions.SPEED);
    this.isPaused = new IsPaused(simulator, DefaultOptions.IS_PAUSED);
  }
}