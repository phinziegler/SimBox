import Vector from "../vector.js";
import { Tool } from "./tools.js";
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

    // Listen for mousedown events on the canvas.
    this.canvas.addEventListener("mousedown", (e) => {
      this.onMousedown(this.mouseLocation(e));
    });

    // END BUTTON
    document.getElementById("end").addEventListener("click", () => {
      this.simulator.endSimulation();
    });
  }

  /**
   * Performs response actions when the user presses the mouse button down on the simulation area.
   * @param {Vector} mousePos The position of the mouse in screen space at the time when the mouse is pressed.
   */
  onMousedown(mousePos) {
    //console.log(`Mousedown at ${mousePos}`);
    const tool = this.toolsHandler.activeTool;
    switch (tool) {
      case Tool.RECTANGLE: case Tool.CIRCLE:
        this.listenForDragComplete(mousePos);
        break;

      case Tool.DELETE:
        this.simulator.deleteSimulatedObject(mousePos);
        break;
      case Tool.PIN_UNPIN:
        this.simulator.pinToggleSimulatedObject(mousePos);
        break;
      case Tool.GRAB:
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
    this.canvas.inputHandler = this;
    this.canvas.addEventListener("mouseup", function onMouseup(e) {
      e.currentTarget.inputHandler.dragComplete(dragStartPos, e.currentTarget.inputHandler.mouseLocation(e));
      e.currentTarget.removeEventListener("mouseup", onMouseup);
    });
  }
  
  /**
   * Performs response actions for completion of a click and drag (once mouse is released) on the simulation area.
   * @param {Vector} startPos The starting screen space position of the drag.
   * @param {Vector} endPos The ending screen space position of the drag.
   * @param {AbortController} signal 
   */
  dragComplete(startPos, endPos, signal) {
    const tool = this.toolsHandler.activeTool;
    const startToEndDragDirection = new Vector(Math.sign(endPos.x - startPos.x), Math.sign(endPos.y - startPos.y));
    const centerDragAreaPos = new Vector((startPos.x + endPos.x)/2, (startPos.y + endPos.y)/2);
    const dragAreaSize = new Vector(Math.abs(endPos.x - startPos.x), Math.abs(endPos.y - startPos.y));
    switch (tool) {
      case Tool.RECTANGLE:
        console.log(`Rectangle: ${startPos} to ${endPos}\nCentered at: ${centerDragAreaPos}\nSize: ${dragAreaSize}`);
        this.simulator.addSimulatedObject(centerDragAreaPos, new Box(dragAreaSize.x, dragAreaSize.y, this.#randomColor()));
        break;

      case Tool.CIRCLE:
        const circleRadius = Math.sqrt(Math.pow(dragAreaSize.x,2) + Math.pow(dragAreaSize.y,2))/2;
        const circleCenterPos = new Vector(endPos.x - ((dragAreaSize.x/2) * startToEndDragDirection.x), endPos.y - ((dragAreaSize.y/2) * startToEndDragDirection.y));
        console.log(`Circle: ${startPos} to ${endPos}\nCentered at: ${circleCenterPos}\nRadius: ${circleRadius}`);
        this.simulator.addSimulatedObject(circleCenterPos, new Circle(circleRadius, this.#randomColor()));
        break;
      case Tool.GRAB:
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

  // HELPER: generates a random color in hexadecimal form
  #randomColor() {
    let hue = Math.random() * 360;
    let sat = 100;
    let light = 50 + (Math.random() * 20);
    return parseInt(this.#hslToHex(hue, sat, light),16);
  }
  #hslToHex(h, s, l) {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = n => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');   // convert to Hex and prefix "0" if needed
    };
    const result = `${f(0)}${f(8)}${f(4)}`;
    return result;
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

    //console.log(pos.x + ", " + pos.y);
    return pos;
  }
}