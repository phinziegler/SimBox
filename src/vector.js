import Simulator from "./simulator.js";

/**
 * A 2D Vector with x and y components.
 */
export default class Vector {
    /**
     * Create a vector.
     * @param {number} x Value of the X-component of the Vector.
     * @param {number} y Value of the Y-component of the Vector.
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    /**
     * Creates a new Vector from an object with x and y properties.
     * @param {*} objectFormVector 
     * @returns {Vector} New Vector from the given object.
     */
    static fromObject(objectFormVector){
        return new Vector(objectFormVector.x, objectFormVector.y);
    }

    /**
     * Returns given decimal rounded to 2 decimal places.
     * @param {number} decimal Number to round.
     * @returns {number} Rounded decimal.
     */
    static roundDecimal(decimal){
        return decimal.toFixed(2);
    }

    /**
     * Gets the render position in pixel coordinates of this Vector in the simulation space.
     * @param {Vector} simulationAreaSize The size in pixels of the simulation area.
     * @returns {Vector} This vector transformed from simulation to pixel space. 
     */
    simulationToRenderPos(simulationAreaSize) {
        return new Vector(this.x * Simulator.metersToPixelsScalar, simulationAreaSize.y - this.y * Simulator.metersToPixelsScalar);
    }


    /**
     * Gets the string representation of the Vector.
     * @override
     * @returns {string} Simple text representation of vector in form (x, y).
     */
    toString() {
        return "(" + Vector.roundDecimal(this.x) + ", " + Vector.roundDecimal(this.y) + ")";
    }

    get x() {
        return this._x;
    }
    set x(x) {
        this._x = x;
    }
    get y() {
        return this._y;
    }
    set y(y) {
        this._y = y;
    }
}