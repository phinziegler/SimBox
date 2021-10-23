import Vector from "../vector.js";

/* Tracks the location of the mouse, clicks, drags, and keyboard presses on 
the simulation area of the webpage. */
export default class InputHandler {
    constructor() {
        this.canvas = document.getElementById("simCanvas");
        this.canvas.addEventListener("click", (e) => {
            this.click(this.mouseLocation(e));
        });
    }

    // DO TOOL ACTION AT MOUSE LOCATION
    click(posVec) {
        throw new Error("click() unimplemented");
    }

    /* RETURNS A VECTOR(X,Y) OF THE POSITION OF MOUSE OVER THE CANVAS
    https://stackoverflow.com/questions/17130395/real-mouse-position-in-canvas*/
    mouseLocation() {
        var rect = canvas.getBoundingClientRect(),  // abs. size of element
        scaleX = canvas.width / rect.width,         // relationship bitmap vs. element for X
        scaleY = canvas.height / rect.height;       // relationship bitmap vs. element for Y
  
    return new Vector((evt.clientX - rect.left) * scaleX, (evt.clientY - rect.top) * scaleY);
    }
}