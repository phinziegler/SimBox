let tool = document.getElementById("toolButton");
let toolMenu = document.getElementById("tools");

let option = document.getElementById("optionButton");
let optionMenu = document.getElementById("options");

tool.addEventListener("click", () => {
    toggleMenu(toolMenu);
});

option.addEventListener("click", () => {
    toggleMenu(optionMenu);
});

function toggleMenu(element) {
    console.log(element.className);
    if(element.className == "open") {
        element.setAttribute("class", "closed");
        //console.log("closed");
    }
    else {
        element.setAttribute("class", "open");
        //console.log("open");
    }
}