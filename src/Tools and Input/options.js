export default class Options {
    constructor() {
        // NO NEED FOR A CONSTRUCTOR
    }

    getSpeed() {
        let speed = document.getElementById("speed").value;
        return speed;
    }

    getGravity() {
        let gravity = document.getElementById("gravity").value;
        return gravity;
    }
    
    isPaused() {
        let isPaused = document.getElementById("pause").checked;
        return isPaused;
    }
}