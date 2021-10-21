// TOOL MENU
let tool = document.getElementById("toolButton");
let toolMenu = document.getElementById("tools");
tool.addEventListener("click", () => {
    toggleMenu(toolMenu);
});

// OPTION MENU
let option = document.getElementById("optionButton");
let optionMenu = document.getElementById("options");
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