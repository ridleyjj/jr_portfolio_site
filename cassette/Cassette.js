class Cassette {

    p;

    height = 200;
    width = this.height * 1.6;
    padding = this.height * 0.06;
    cornerCircleSize = this.height * 0.04;
    strokeWeight = this.height * 0.02;
    offset = 0;

    handwritingFont = "Caveat-VariableFont_wght";
    boldFont = "BowlbyOneSC-Regular";
    mainPrintFont = "Verdana";
    labelName = "Software Developer";

    constructor(p, bg) {
        this.p = p;
        this.setCassettePosition(p.width / 2, p.height / 2);
        this.bg = bg;
    }

    setCassettePosition(x, y) {
        this.x = x - this.width / 2;
        this.y = y - this.height / 2;
        this.rightX = this.x + this.width - this.padding;
        this.leftX = this.x + this.padding;
        this.topY = this.y + this.padding;
        this.bottomY = this.y + this.height - this.padding;
    }

    draw(acceleration) {
        // stroke weight calibrated to 4 for height of 200 - may adjust this later
        this.p.strokeWeight(this.strokeWeight);

        // main body
        this.p.fill(222, 81, 20);
        this.p.rect(this.x, this.y, this.width, this.height, 5);

        // TODO - clean up this drawing logic

        // bottom section
        this.p.beginShape();
        let shapeX = this.x + this.width * 0.2;
        let shapeY = this.y + this.height;
        this.p.vertex(shapeX, shapeY);
        shapeX += this.width * 0.04;
        shapeY -= this.height * 0.23;
        this.p.vertex(shapeX, shapeY);
        shapeX += this.width * 0.52;
        this.p.vertex(shapeX, shapeY);
        shapeX += this.width * 0.04;
        shapeY += this.height * 0.23;
        this.p.vertex(shapeX, shapeY);
        this.p.endShape(this.p.CLOSE);
        
        // holes
        this.p.circle(this.rightX, this.topY, this.cornerCircleSize);
        this.p.circle(this.rightX, this.bottomY, this.cornerCircleSize);
        this.p.circle(this.leftX, this.topY, this.cornerCircleSize);
        this.p.circle(this.leftX, this.bottomY, this.cornerCircleSize);
        
        this.p.circle(this.leftX + this.width * 0.25, this.bottomY - this.height * 0.015, this.cornerCircleSize);
        this.p.circle(this.rightX - this.width * 0.25, this.bottomY - this.height * 0.015, this.cornerCircleSize);
        this.p.circle(this.x + this.width * 0.5, this.bottomY - this.height * 0.09, this.cornerCircleSize);

        // middle section
        this.p.fill(255, 255, 255);
        this.p.beginShape();
        shapeX = this.x + this.width * 0.05;
        shapeY = this.y + this.height * 0.7;
        this.p.vertex(shapeX, shapeY);
        shapeY -= this.height * 0.54;
        this.p.vertex(shapeX, shapeY);
        shapeX += this.width * 0.05;
        shapeY -= this.height * 0.08;
        this.p.vertex(shapeX, shapeY);
        shapeX = this.x + this.width * 0.9;
        this.p.vertex(shapeX, shapeY);
        shapeX += this.width * 0.05;
        shapeY += this.height * 0.08;
        this.p.vertex(shapeX, shapeY);
        shapeY += this.height * 0.54;
        this.p.vertex(shapeX, shapeY);
        this.p.endShape(this.p.CLOSE);

        this.p.push();
        this.p.fill(240, 195, 72);
        this.p.noStroke();
        this.p.rect(this.x + this.width * 0.05 + this.strokeWeight * 0.5, this.y + this.height * 0.3, this.width * 0.9 - this.strokeWeight, this.height * 0.4 - this.strokeWeight * 0.5);
        this.p.pop();
        this.p.push();
        // don't think I like this line but leaving it in for comparison
        //line(this.x + this.width * 0.05, this.y + this.height * 0.3, this.x + this.width * 0.95, this.y + this.height * 0.3);
        this.p.fill(0, 0, 0);
        this.p.textFont(this.mainPrintFont, this.height * 0.13);
        this.p.text("A", this.x + this.width * 0.12, this.y + this.height * 0.24);
        this.p.textFont(this.mainPrintFont, this.height * 0.07);
        this.p.text("C-60", this.x + this.width * 0.82, this.y + this.height * 0.65);
        this.p.textFont(this.boldFont, this.height * 0.07);
        this.p.text("HQ", this.x + this.width * 0.08, this.y + this.height * 0.65);
        this.p.stroke(0, 0, 0);
        this.p.strokeWeight(this.strokeWeight * 0.5);
        this.p.line(this.x + this.width * 0.25, this.y + this.height * 0.15, this.x + this.width * 0.85, this.y + this.height * 0.15);
        this.p.line(this.x + this.width * 0.25, this.y + this.height * 0.23, this.x + this.width * 0.85, this.y + this.height * 0.23);
        this.p.noStroke();
        this.p.fill(45, 50, 170);
        this.p.textFont(this.handwritingFont, this.height * 0.125);
        this.p.text(this.labelName, this.x + this.width * 0.29, this.y + this.height * 0.22);
        this.p.pop();

        // cutaways
        this.p.fill(this.bg.r, this.bg.g, this.bg.b);
        this.p.rect(this.x + this.width * 0.37, this.bottomY - this.height * 0.04, this.width * 0.08, this.height * 0.055);
        this.p.rect(this.x + this.width * 0.55, this.bottomY - this.height * 0.04, this.width * 0.08, this.height * 0.055);
        
        let centreRowY = this.y + this.height * 0.5;
        this.p.circle(this.x + this.width * 0.25, centreRowY, this.height * 0.25);
        this.p.circle(this.x + this.width * 0.75, centreRowY, this.height * 0.25);
        let smallRectW = this.width * 0.28;
        let smallRectH = this.height * 0.25;
        this.p.rect(this.x + this.width * 0.36, centreRowY - smallRectH * 0.5, smallRectW, smallRectH);

        // tape wheels
        this.p.fill(100);
        this.p.beginShape();
        shapeX = this.x + this.width * 0.36;
        shapeY = centreRowY - smallRectH * 0.5;
        this.p.vertex(shapeX, shapeY);
        shapeY += smallRectH;
        this.p.vertex(shapeX, shapeY);
        shapeX += smallRectW * 0.3;
        this.p.vertex(shapeX, shapeY);
        this.p.bezierVertex(shapeX + smallRectW * 0.05, shapeY - smallRectH * 0.4, shapeX + smallRectW * 0.05, shapeY - smallRectH * 0.6, shapeX, shapeY - smallRectH);
        this.p.endShape(this.p.CLOSE);

        this.p.beginShape();
        shapeX = this.x + this.width * 0.36 + smallRectW;
        shapeY = centreRowY - smallRectH * 0.5;
        this.p.vertex(shapeX, shapeY);
        shapeY += smallRectH;
        this.p.vertex(shapeX, shapeY);
        shapeX -= smallRectW * 0.3;
        this.p.vertex(shapeX, shapeY);
        this.p.bezierVertex(shapeX - smallRectW * 0.05, shapeY - smallRectH * 0.4, shapeX - smallRectW * 0.05, shapeY - smallRectH * 0.6, shapeX, shapeY - smallRectH);
        this.p.endShape(this.p.CLOSE);

        // wheel teeth
        this.offset += 0.1 * acceleration;
        this.offset = JrUtils.constrainLoop(this.offset, 0, 1);
        this.drawWheelTeeth(this.x + this.width * 0.25, centreRowY);
        this.drawWheelTeeth(this.x + this.width * 0.75, centreRowY);
    }

    /**
     * originX and originY are the center point of the circle in which the teeth will be drawn
     * offset is between 0-1 and will spin the wheels
     */
    drawWheelTeeth(originX, originY) {
        this.p.fill(255);
        this.p.push();
        this.p.angleMode(this.p.DEGREES);
        this.p.rectMode(this.p.CENTER);
        let toothSize = this.height * 0.045;
        this.p.translate(originX, originY);
        this.p.rotate(60 * this.offset);
        for (let i = 0; i < 6; i++) {
            this.p.rotate(60);
            this.p.square(0, this.height * 0.1, toothSize, 1.2);
        }
        this.p.pop();
    }
}
