import PhysicsObject from "./PhysicsObject.js";

export default class RigidBody extends PhysicsObject {

    constructor(x, y, mass) {
        super(x, y, mass);
    }

    // return the angle of the rigid body
	setAngle(angle) {
        this.angle = angle;
    }

    // set the angle of the rigid body
    getAngle() {
        return this.angle;
    }
}
