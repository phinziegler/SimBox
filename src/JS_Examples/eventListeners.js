let myElement = document.getElementById("element1");
/* now the variable 'myElement' is an HTML element
 JavaScript lets us change things like the width, height and background color 
 of myElement now (as well as many other things).
*/

myElement.addEventListener("click",(e) => {
    myFunction();
})
/* THIS IS CALLED AN EVENT LISTENER
In this case, myElment corresponds to the html element with id 'element1'...
Thus we are adding the ability to CLICK on element1. When element 1 is CLICKED, myFunction will be called.
There are MANY other events that can be listened for... keydown, keyup, onMenu, etc.
*/

function myFunction() {
    console.log("click event!");
}

// This is how functions are defined when they are defined OUTSIDE of a class...