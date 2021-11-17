
// TOGGLE MENU FUNCTION
export default function toggleMenu(element) {
    if(element.className == "open") {
        element.setAttribute("class", "closed");
    }
    else {
        element.setAttribute("class", "open");
    }
}