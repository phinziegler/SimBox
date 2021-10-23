export default class Options {
    constructor() {

        this.list = Array.from(document.querySelectorAll(".menuOption"));
        for(let i = 0; i < this.list.length; i++) {
            this.list[i].addEventListener("click", () => {
                this.setActiveTool(this.list[i].id);
            });
        }
        this.activeTool = "select";

        this.speed;
        this.gravity;
        this.isPaused;
    }

    getSpeed() {
        throw new Error("getSpeed() unimplemented");
    }

    getGravity() {
        throw new Error("getGravity() unimplemented");
    }

    isPaused() {
        throw new Error("isPaused() unimplemented");
    }
}