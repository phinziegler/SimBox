export default class Tools {
    constructor() {

        // LIST OF ALL TOOLS
        this.list = Array.from(document.querySelectorAll(".menuToolButton"));

        // ADD EVENT LISTENER TO ALL TOOLS -- when a tool button is clicked it sets that tool to the current active tool
        for(let i = 0; i < this.list.length; i++) {
            this.list[i].addEventListener("click", () => {
                this.setActiveTool(this.list[i].id);
            });
        }

        // THE CURRENT ACTIVE TOOL -- rectangle by default
        this.activeTool = "rectangle";
    }

    setActiveTool(tool) {
        this.activeTool = tool;
        console.log(this.getActiveTool() + " active");
    }

    getActiveTool() {
        return this.activeTool;
    }
}