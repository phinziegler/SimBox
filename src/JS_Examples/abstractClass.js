export default class AbstractClass {
    constructor(param1, param2) {

        // MANUALLY enforce that an AbstractClass cannot be instantiated.
        if(this.constructor == AbstractClass) {
            throw new Error("abstract classes cannot be instantiated");
        }

        // can still give local variables that will be present in all children.
        this.param1 = param1;
        this.param2 = param2;
    }

    // can put getters and setters in abstract class --- dont need to redo this code in children.
    getParam1() {
        return this.param1;
    }

    // ABSTRACT METHOD -- throws an error when a child calls this method without its own implementation.
    method1(myParameter) {
        throw new Error("method1() must be implemented");   // NOTICE that the abstract behavior is MANUALLY enforced.
    }
}