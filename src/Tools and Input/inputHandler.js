import Vector from "../vector.js";
import Options from "./options.js";
import Tools from "./tool.js";

/* Tracks the location of the mouse, clicks, drags, and keyboard presses on 
the simulation area of the webpage. */
export default class InputHandler {
    constructor() {
        this.canvas = document.getElementById("simCanvas");
        this.canvas.addEventListener("mousedown", (e) => {
            this.click(this.mouseLocation(e));
        });
        this.canvas.addEventListener("mouseup", (e) => {
            this.click(this.mouseLocation(e));
        });


        this.tool = new Tools();        // THE TOOLS ARE STORED IN THE INPUT HANDLER
        this.option = new Options();    // THE OPTIONS ARE STORED IN THE INPUT HANDLER
    }

    // DO TOOL ACTION AT MOUSE LOCATION -- relies on ENGINE and makes calls there.
    click(posVector) {
        // engine.click(this.tool.getActiveTool(), posVector);
        throw new Error("click() unimplemented");
    }
    unclick(posVector) {
        // engine.unclick(this.tool.getActiveTool(), posVector);
        throw new Error("click() unimplemented");
    }

    /* RETURNS A VECTOR(X,Y) OF THE POSITION OF MOUSE OVER THE CANVAS
    https://stackoverflow.com/questions/17130395/real-mouse-position-in-canvas*/
    mouseLocation(e) {
        let rect = this.canvas.getBoundingClientRect();  // abs. size of element
        let scaleX = this.canvas.width / rect.width;         // relationship bitmap vs. element for X
        let scaleY = this.canvas.height / rect.height;       // relationship bitmap vs. element for Y
  
        let pos = new Vector(Math.floor((e.clientX - rect.left) * scaleX) + 1, Math.floor((e.clientY - rect.top) * scaleY) + 1);

        console.log(pos.getX() + ", " + pos.getY());
        return pos;
    }
}