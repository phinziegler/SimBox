import RigidBody from "./RigidBody.js";

describe("PhysicsObject", () => {
  test("should set mass through constructor", () => {
    const mass = 5;
    const physicsObject = new RigidBody(0, 0, mass);
    expect(physicsObject.mass).toEqual(mass);
  });
});