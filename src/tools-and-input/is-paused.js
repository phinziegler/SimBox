import Option from "./option.js";

export default class IsPaused extends Option {
  init() {
    this.isPausedCheckbox = document.getElementById("pause");
  }

  updateUI() {
    this.isPausedCheckbox.checked = this.value;
  }

  listenForUserInput() {
    this.isPausedCheckbox.addEventListener("change", () => {
      this.value = this.isPausedCheckbox.checked;
    });
  }

  get value() {
    return this._value;
  }
  set value(isPaused) {
    this._value = isPaused;
  }
}