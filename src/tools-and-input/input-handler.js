import Vector from "../vector.js";
import Options from "./options.js";
import { tools } from "./tools.js";
import ToolsHandler from "./tools.js";
import Box from "../simulated-object-bodies/box.js";
import Circle from "../simulated-object-bodies/circle.js";
import Simulator from "../simulator.js";

/* Tracks the location of the mouse, clicks, drags, and keyboard presses on 
the simulation area of the webpage. */
export default class InputHandler {
    /**
     * Create an InputHandler.
     * @param {Simulator} simulator The simulator that this InputHandler is bound to.
     */
    constructor(simulator) {
        /**
         * The simulator that the InputHandler serves.
         * @type {Simulator}
         */
        this.simulator = simulator;
        /**
         * The canvas element that the InputHandler listens to.
         * @type {HTMLElement}
         */
        this.canvas = simulator.simulationCanvas;

        /**
         * The ToolsHandler bound to this InputHandler.
         * @type {ToolsHandler}
         */
        this.toolsHandler = new ToolsHandler();
        /**
         * The options bound to this InputHandler.
         * @type {Options}
         */
        this.options = new Options();

        // Listen for mousedown events on the canvas.
        this.canvas.addEventListener("mousedown", (e) => {
            this.onMousedown(this.mouseLocation(e));
        });
    }

    /**
     * Performs response actions when the user presses the mouse button down on the simulation area.
     * @param {Vector} mousePos The position of the mouse in screen space at the time when the mouse is pressed.
     */
    onMousedown(mousePos) {
        const tool = this.toolsHandler.activeTool;
        switch (tool) {
            case tools.RECTANGLE: case tools.CIRCLE:
                this.listenForDragComplete(mousePos);
                break;

            case tools.SELECT:
                throw new Error(tool + " tool unimplemented");
                break;
            case tools.GRAB:
                throw new Error(tool + " tool unimplemented");
                break;
            /* case "clothNode":
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
                break; */
            default:
                throw new Error(tool + " tool does not exist");
                break;
        }
    }

    /**
     * Begins listening for the mouse button to release, meaning that a click and drag action was completed by the user.
     * @param {Vector} dragStartPos The starting mouse position in screen space of the user's drag.
     */
    listenForDragComplete(dragStartPos) {
        const abortSignal = new AbortController(); // THIS ALLOWS AN EVENT LISTENER TO BE ABORTED -- solves issue with event firing twice
        this.canvas.addEventListener("mouseup", (e) => {
            this.dragComplete(dragStartPos, this.mouseLocation(e), abortSignal);
        },{ signal: abortSignal.signal});
    }
    
    /**
     * Performs response actions for completion of a click and drag (once mouse is released) on the simulation area.
     * @param {Vector} startPos The starting screen space position of the drag.
     * @param {Vector} endPos The ending screen space position of the drag.
     * @param {AbortController} signal 
     */
    dragComplete(startPos, endPos, signal) {
        signal.abort();
        const tool = this.toolsHandler.activeTool;
        const startToEndDragDirection = new Vector(Math.sign(endPos.x - startPos.x), Math.sign(endPos.y - startPos.y));
        const centerDragAreaPos = new Vector((startPos.x + endPos.x)/2, (startPos.y + endPos.y)/2);
        const dragAreaSize = new Vector(Math.abs(endPos.x - startPos.x), Math.abs(endPos.y - startPos.y));
        switch (tool) {
            case tools.RECTANGLE:
                console.log(`Rectangle: ${startPos} to ${endPos}\nCentered at: ${centerDragAreaPos}\nSize: ${dragAreaSize}`);
                this.simulator.addSimulatedObject(centerDragAreaPos, new Box(dragAreaSize.x, dragAreaSize.y, 0xFFFFFF));
                break;

            case tools.CIRCLE:
                const circleRadius = Math.min(dragAreaSize.x, dragAreaSize.y)/2;
                const circleCenterPos = new Vector(endPos.x - (circleRadius * startToEndDragDirection.x), endPos.y - (circleRadius * startToEndDragDirection.y));
                console.log(`Circle: ${startPos} to ${endPos}\nCentered at: ${circleCenterPos}\nRadius: ${circleRadius}`);
                this.simulator.addSimulatedObject(circleCenterPos, new Circle(circleRadius, 0xFFFFFF));
                break;

            case tools.SELECT:
                throw new Error(tool + " tool unimplemented");
                break;
            case tools.GRAB:
                throw new Error(tool + " tool unimplemented");
                break;
            /* case "clothNode":
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
                break; */
            default:
                throw new Error(tool + " tool does not exist");
                break;
        }

    }

    /**
     * Gets the position of the mouse over the simulation area from a given mouse event. - https://stackoverflow.com/questions/17130395/real-mouse-position-in-canvas.
     * @param {MouseEvent} e MouseEvent to extract mouse position from.
     * @returns {Vector} Vector of the mouse position over the canvas in screen space.
     */
    mouseLocation(e) {
        let rect = this.canvas.getBoundingClientRect();  // abs. size of element
        let scaleX = this.canvas.width / rect.width;         // relationship bitmap vs. element for X
        let scaleY = this.canvas.height / rect.height;       // relationship bitmap vs. element for Y

        let pos = new Vector(Math.floor((e.clientX - rect.left) * scaleX) + 1, Math.floor((e.clientY - rect.top) * scaleY) + 1);

        //console.log(pos.getX() + ", " + pos.getY());
        return pos;
    }
}