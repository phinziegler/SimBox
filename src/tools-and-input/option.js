

export default class Option {
  constructor(simulator, defaultValue) {
    this.simulator = simulator;
    this.value = defaultValue;
    this.init();
    this.updateUI();
    this.listenForUserInput();
  }
  init() {
    throw new Error("Must be implemented.");
  }

  updateUI() {
    throw new Error("Must be implemented.");
  }

  listenForUserInput() {
    throw new Error("Must be implemented.");
  }

  listenForTextInputFieldChange(inputField, onChange){
    inputField.addEventListener("input", () => {
      onChange();
    });
  }
}