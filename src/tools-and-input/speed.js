import Option from "./option.js";

export default class Speed extends Option {
  init() {
    this.speedInputField = document.getElementById("speed");
  }

  updateUI() {
    this.speedInputField.value = this.value;
  }

  listenForUserInput() {
    this.listenForTextInputFieldChange(this.speedInputField, () => {
      this.value = parseFloat(this.speedInputField.value);
    });
  }

  get value() {
    return this._value;
  }
  set value(speed) {
    this._value = speed;
  }
}