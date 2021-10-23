export default class Options {
    constructor() {

        this.speedButton = document.getElementById("speed");
        this.gravityButton = document.getElementById("gravity");
        this.isPausedButton = document.getElementById("pause");

        this.speedButton.addEventListener("oninput", () => {
            this.speed = speedButton.value;
            console.log(this.speed + "YEET");
        });

        this.gravityButton.addEventListener("oninput", () => {
            this.gravity = gravityButton.value;
            console.log(this.gravity + "YEET");
        });

        this.isPausedButton.addEventListener("oninput", () => {
            this.isPaused = isPausedButton.value;
            console.log(this.isPaused+ "YEET");
        });

    }

    getSpeed() {
        throw new Error("getSpeed() unimplemented");
    }

    getGravity() {
        throw new Error("getGravity() unimplemented");
    }

    isPaused() {
        throw new Error("isPaused() unimplemented");
    }
}