import OtherClass from "./otherclass.js";   // ./ implies that the other class is in the same folder.
// if you want import from something outside a folder, you will need to do something like...
import FarAwayClass from "../otherfolder/farawayclass.js";


/* This is a long form comment, 
     it can span multiple lines!
*/
export default class MyClass  extends OtherClass {		// “export default” is required to use the class in other classes

    constructor(myName) {			// this is how you do constructors
        this.myName = myName; 		// now this class has a local variable
        this.forLength = 10;        // ALL LOCAL VARIABLES MUST BE DECLARED IN THE CONSTRUCTOR LIKE THIS
        this.whileLength = 100;  
    }

    getForLength() {                // it is best practice to still use getters/setters
        return this.forLength;
    }

    myMethod(myParam) {             // there is NO way to declare a type, even though types exist.
        let i = this.whileLength;				// you declare variables with const or let const implies that its value will not change
        while (i > 0) {
            console.log("Hello there");		// this will print to the console
            i--;
        }

        for(let n = 0; n < this.forLength; n++) {
            console.log(n);                 // you can console.log numbers
        }

        if(typeof myParam == String) {      // typeof allows you to check the type of a variable
            console.log(myParam);
        }

        return "Notice how you didnt have to declare a return type";
    }
}
