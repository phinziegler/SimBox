
/**
 * Container for tool IDs.
 */
export const tools = {
    RECTANGLE: "rectangle",
    CIRCLE: "circle",
    SELECT: "select",
    GRAB: "grab",
}

export default class ToolsHandler {
    constructor() {
        /**
         * List of all tool IDs.
         * @type {Element[]}
         */
        this.list = Array.from(document.querySelectorAll(".menuToolButton"));

        // ADD EVENT LISTENER TO ALL TOOLS -- when a tool button is clicked it sets that tool to the current active tool
        for(let i = 0; i < this.list.length; i++) {
            this.list[i].addEventListener("click", () => {
                this.activeTool = this.list[i].id;
            });
        }

        this.activeTool = tools.RECTANGLE; // Active tool is rectangle by default.
    }

    /**
     * The tool ID of the currently active tool.
     * @type {string}
     */
    get activeTool() {
        return this._activeTool;
    }
    set activeTool(tool) {
        this._activeTool = tool;
        console.log(this.activeTool + " active");
    }
}