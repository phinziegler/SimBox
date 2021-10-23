export default class PhysicsObject {
	// assigns the x and y pixel coordinates, and assigns the object's mass
    constructor(x, y, mass) {

        // MANUALLY enforce that an AbstractClass cannot be instantiated.
        if(this.constructor == PhysicsObject) {
            throw new Error("Abstract classes cannot be instantiated");
        }

        // set fields
        this.location = {x:x, y:y};
		this.mass = mass;
    }

    // moves the rigid body to the given pixel coordinates
    setLocation(x, y) {
        this.location = {x:x, y:y};
    }

    // returns the position of an object as a vector
    getLocation() {
        return this.location;
    }

    // set the velocity vector of the object
    setVelocity(velocity) {
        this.velocity = velocity;
    }

    // returns the velocity vector of the object
    getVelocity() {
        return this.velocity;
    }

    // sets the acceleration vector of the object
    setAcceleration(acceleration) {
        this.acceleration = acceleration;
    }

    // returns the velocity vector of the object
    getAcceleration() {
        return this.acceleration;
    }

    // set the mass of the object
    setMass(mass) {
        this.mass = mass;
    }

    // returns the mass of the object
    getMass() {
        return this.mass;
    }

    // abstract, updates object
    update(velocity, acceleration, x, y, PhysicsObjects) {
        throw new Error("update must be implemented");
    }

    // abstract, visually display the rigid body
    render() {
        throw new Error("render must be implemented");
    }
}