export default class Tools {
    constructor() {
        this.list = Array.from(document.querySelectorAll(".menuToolButton"));
        console.log(this.list.length);
        for(let i = 0; i < this.list.length; i++) {
            this.list[i].addEventListener("click", () => {
                this.setActiveTool(this.list[i].id);
            });
        }
        this.activeTool = "select";
    }

    setActiveTool(tool) {
        this.activeTool = tool;
        console.log(this.getActiveTool() + " active");
    }

    getActiveTool() {
        return this.activeTool;
    }
}