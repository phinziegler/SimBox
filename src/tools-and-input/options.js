export default class Options {
    constructor() {
        this.gravityElement = document.getElementById("gravity");
        this.gravity = parseFloat(this.gravityElement.value);
        console.log("gravity = " + this.gravity);

        this.speedElement = document.getElementById("speed");
        this.speed = parseFloat(this.speedElement.value);

        this.pausedElement = document.getElementById("pause");
        this.isPaused = this.pausedElement.checked;
    }

    getSpeed() {
        return this.speed;
    }

    getGravity() {
        return this.gravity;
    }
    
    isPaused() {
        return this.isPaused;
    }
}