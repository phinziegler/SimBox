import Vector from "../vector.js";

/* Tracks the location of the mouse, clicks, drags, and keyboard presses on 
the simulation area of the webpage. */
export default class InputHandler {
    constructor() {
        this.canvas = document.getElementById("simulationCanvas");
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
    mouseLocation(e) {
        let rect = this.canvas.getBoundingClientRect();  // abs. size of element
        let scaleX = this.canvas.width / rect.width;         // relationship bitmap vs. element for X
        let scaleY = this.canvas.height / rect.height;       // relationship bitmap vs. element for Y
  
        let pos = new Vector(Math.floor((e.clientX - rect.left) * scaleX) + 1, Math.floor((e.clientY - rect.top) * scaleY) + 1);

        console.log(pos.x + ", " + pos.y);
        return pos;
    }
}