import RigidBody from "./rigidbody.js";

describe("PhysicsObject", () => {
  test("should set mass through constructor", () => {
    const mass = 5;
    const physicsObject = new RigidBody(0, 0, mass);
    expect(physicsObject.mass).toEqual(mass);
  });
});

describe("PhysicsObject", () => {
  test("should set location through constructor", () => {
    const x = 5;
    const y = 6
    const physicsObject = new RigidBody(x, y, 5);
    expect(physicsObject.getLocation()).toEqual((x,y));
  });
});

describe("PhysicsObject", () => {
  test("should set angle of rigid body through getter/setter", () => {
    const x = 36;
    const physicsObject = new RigidBody(5, 5, 5);
    physicsObject.setAngle(36)
    expect(physicsObject.getAngle()).toEqual((x));
  });
});

describe("PhysicsObject", () => {
  test("should return active tool - default rectangle", () => {
    const physicsObject = new RigidBody(5, 5, 5);
    expect(physicsObject.tool.getActiveTool()).toEqual(("rectangle"));
  });
});