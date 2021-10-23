import RigidBody from "./RigidBody.js";

export default class Rectangle extends RigidBody {

    constructor(x, y, mass) {
        this.super(x, y, mass);
    }

    // returns the height of the Rectangle object
	setHeight(height) {
        this.height = height;
    }

    // sets the height of the Rectangle object
    getHeight() {
        return this.height;
    }

    // returns the width of the Rectangle object
	setWidth(width) {
        this.width = width;
    }

    // sets the width of the Rectangle object
    getWidth() {
        return this.width;
    }
}
