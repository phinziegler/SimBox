import Vector from "../vector.js";
import Options from "./options.js";
import Tools from "./tool.js";

/* Tracks the location of the mouse, clicks, drags, and keyboard presses on 
the simulation area of the webpage. */
export default class InputHandler {
    constructor() {
        this.canvas = document.getElementById("simulationCanvas");
        this.canvas.addEventListener("mousedown", (e) => {
            this.click(this.mouseLocation(e));
        });

        this.tool = new Tools();        // THE TOOLS ARE STORED IN THE INPUT HANDLER
        this.option = new Options();    // THE OPTIONS ARE STORED IN THE INPUT HANDLER
    }

    // DO TOOL ACTION AT MOUSE LOCATION -- relies on ENGINE and makes calls there.
    click(posVector) {
        // engine.click(this.tool.getActiveTool(), posVector);
        let tool = this.tool.getActiveTool();
        let abortSignal = new AbortController(); // THIS ALLOWS AN EVENT LISTENER TO BE ABORTED -- solves issue with event firing twice

        switch (tool) {
            case "rectangle":
                this.canvas.addEventListener("mouseup", (e) => {
                    this.unclick(posVector, this.mouseLocation(e), abortSignal);
                },{ signal: abortSignal.signal});
                break;

            case "circle":
                this.canvas.addEventListener("mouseup", (e) => {
                    this.unclick(posVector, this.mouseLocation(e), abortSignal);
                },{ signal: abortSignal.signal});
                break;

            case "select":
                throw new Error(tool + " tool unimplemented");
                break;
            case "grab":
                throw new Error(tool + " tool unimplemented");
                break;
            case "clothNode":
                throw new Error(tool + " tool unimplemented");
                break;
            case "clothEdge":
                throw new Error(tool + " tool unimplemented");
                break;
            case "pinUnpin":
                throw new Error(tool + " tool unimplemented");
                break;
            case "cutEdge":
                throw new Error(tool + " tool unimplemented");
                break;
            case "addFluid":
                throw new Error(tool + " tool unimplemented");
                break;
            case "removeFluid":
                throw new Error(tool + " tool unimplemented");
                break;
            case "moveFluid":
                throw new Error(tool + " tool unimplemented");
                break;
            default:
                throw new Error(tool + " tool does not exist");
                break;
        }
    }
    unclick(startPos, endPos, signal) {
        signal.abort();
        let tool = this.tool.getActiveTool();
        switch (tool) {
            case "rectangle":
                console.log("Rectangle: (" + startPos.x + ", " + startPos.y + ") to (" + endPos.x + ", " + endPos.y + ")");
                break;

            case "circle":
                console.log("Circle: (" + startPos.x + ", " + startPos.y + ") to (" + endPos.x + ", " + endPos.y + ")");
                break;

            case "select":
                throw new Error(tool + " tool unimplemented");
                break;
            case "grab":
                throw new Error(tool + " tool unimplemented");
                break;
            case "clothNode":
                throw new Error(tool + " tool unimplemented");
                break;
            case "clothEdge":
                throw new Error(tool + " tool unimplemented");
                break;
            case "pinUnpin":
                throw new Error(tool + " tool unimplemented");
                break;
            case "cutEdge":
                throw new Error(tool + " tool unimplemented");
                break;
            case "addFluid":
                throw new Error(tool + " tool unimplemented");
                break;
            case "removeFluid":
                throw new Error(tool + " tool unimplemented");
                break;
            case "moveFluid":
                throw new Error(tool + " tool unimplemented");
                break;
            default:
                throw new Error(tool + " tool does not exist");
                break;
        }

    }

    /* RETURNS A VECTOR(X,Y) OF THE POSITION OF MOUSE OVER THE CANVAS
    https://stackoverflow.com/questions/17130395/real-mouse-position-in-canvas*/
    mouseLocation(e) {
        let rect = this.canvas.getBoundingClientRect();  // abs. size of element
        let scaleX = this.canvas.width / rect.width;         // relationship bitmap vs. element for X
        let scaleY = this.canvas.height / rect.height;       // relationship bitmap vs. element for Y

        let pos = new Vector(Math.floor((e.clientX - rect.left) * scaleX) + 1, Math.floor((e.clientY - rect.top) * scaleY) + 1);

        //console.log(pos.getX() + ", " + pos.getY());
        return pos;
    }
}