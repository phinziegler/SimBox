import toggleMenu, * as name from "../menus.js";

/**""
 * Container for tool IDs.
 */
export const Tool = {
  RECTANGLE: "rectangle",
  CIRCLE: "circle",
  DELETE: "delete",
  PIN_UNPIN: "pinUnpin",
  SELECT: "select",
  GRAB: "grab",
}

/**
 * The name of the active tool class.
 */
const activeToolClass = "activeTool";

/**
 * The active tool by default.
 */
const defaultActiveTool = Tool.CIRCLE;

export default class ToolsHandler {
  constructor() {
    /**
     * The element that contains the tools elements.
     * @type {Element}
     */
    this.toolsContainerElement = document.querySelector("#menuPanel");
    this.indicator = document.getElementById("activeTool");
    /**
     * List of all tool IDs.
     * @type {Element[]}
     */
    this.list = Array.from(this.toolsContainerElement.querySelectorAll(".menuToolButton"));
    this.buildToolsMenuUI();
  }

  /**
   * Builds the UI for the tools menu and respective buttons.
   */
  buildToolsMenuUI(){
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

    // ADD EVENT LISTENER TO ALL TOOLS -- when a tool button is clicked it sets that tool to the current active tool
    for(let i = 0; i < this.list.length; i++) {
      this.list[i].addEventListener("click", () => {
        this.activeTool = this.list[i].id;
        this.indicator.setAttribute("class", this.list[i].childNodes[1].className);
        toggleMenu(document.getElementById("tools"));
      });
    }
    this.activeTool = defaultActiveTool; // Set the default active tool once the UI is constructed.
    this.indicator.className = document.getElementById(defaultActiveTool).childNodes[1].className;
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

    // Remove all current visual indicators of the currently active tool.
    const currentActiveTools = this.toolsContainerElement.querySelectorAll(`.${activeToolClass}`);
    for (const activeTool of currentActiveTools) {
      activeTool.classList.remove(activeToolClass);
    }

    this.toolsContainerElement.querySelector(`#${tool}`).classList.add(activeToolClass); // Set the new visual indicator for the currently active tool.
  }
}