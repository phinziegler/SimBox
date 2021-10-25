import Option from "./option.js";

export default class Gravity extends Option {
  init() {
    this.gravityElement = document.getElementById("gravity");
    console.log("here");
  }

  updateUI() {
    this.gravityElement.value = -this.value;
  }

  listenForUserInput() {
    this.listenForTextInputFieldChange(this.gravityElement, () => {
      this.value = -parseFloat(this.gravityElement.value);
    });
  }

  get value() {
    return this._value;
  }
  set value(gravity) {
    if (!Number.isNaN(gravity)) {
      this._value = gravity;
      this.simulator.physicsWorld.setGravity(planck.Vec2(0, gravity));
    }
  }
}