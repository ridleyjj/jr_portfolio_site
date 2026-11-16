class SampleLine {
    pFiveInstance;
    speed = 0;
    x = 0;
    currentHeight = 0;
    targetHeight = 0;
    maxHeight;
    lineWidth;


    constructor(p, x, lineWidth) {
        this.pFiveInstance = p;
        this.x = x;
        this.maxHeight = p.height * 0.4;
        this.lineWidth = lineWidth;
        this.currentHeight = p.random(this.maxHeight);
        this.targetHeight = this.currentHeight;
    }

    update(newSpeed) {
        this.speed = newSpeed;

        if (this.speed == 0)
            return;

        let reachedTarget = false;

        if (this.currentHeight < this.targetHeight) {
            this.currentHeight += this.speed;
            reachedTarget = this.currentHeight >= this.targetHeight;
        }
        else {
            this.currentHeight -= this.speed;
            reachedTarget = this.currentHeight <= this.targetHeight;
        }

        if (reachedTarget) {
            this.targetHeight = this.pFiveInstance.random(this.maxHeight);
        }

    }

    draw() {
        let y = this.pFiveInstance.height / 2;
        this.pFiveInstance.stroke(76, 158, 231);
        this.pFiveInstance.strokeWeight(this.lineWidth);
        this.pFiveInstance.line(this.x, y, this.x, y - this.currentHeight);
        this.pFiveInstance.line(this.x, y, this.x, y + this.currentHeight);
    }
}