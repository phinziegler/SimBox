export default class Options {
    constructor() {
        // NO NEED FOR A CONSTRUCTOR
    }

    static getSpeed() {
        let speed = document.getElementById("speed").value;
        return speed;
    }

    static getGravity() {
        let gravity = document.getElementById("gravity").value;
        return gravity;
    }
    
    static isPaused() {
        let isPaused = document.getElementById("pause").checked;
        return isPaused;
    }
}