import Vector from "../vector.js";
import Circle from "./circle.js"; 

export default class node extends Circle {
    /**
     * 
     * @param {Vector} v 
     */
    constructor(v) {
        super(2, 0xFFFFFF);
        this.v = v; 
    }

    get x(){
        return v.x(); 
    }

    get y(){
        return v.y(); 
    }

    get getV(){
        return v; 
    }
}