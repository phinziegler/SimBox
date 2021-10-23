/* Tracks the location of the mouse, clicks, drags, and keyboard presses on 
the simulation area of the webpage. */
export default class InputHandler {
    constructor() {
        this.canvas = document.getElementById("simCanvas");
        this.canvas.addEventListener("click", (e) => {
            this.click();
        });
    }

    click() {
        throw new Error("click() unimplemented");
    }

    mouseLocation() {
        throw new Error("mouseLocation unimplemented");
    }
}