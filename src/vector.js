export default class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    // GETTERS AND SETTERS
    getX() {
        return this.x;
    }
    getY() {
        return this.y;
    }
    setX(x) {
        this.x = x;
    }
    setY(y) {
        this.y = y;
    }
}