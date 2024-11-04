class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 40; // Set an appropriate size for T-cell
    }

    move() {
        if (keyIsDown(LEFT_ARROW)) this.x -= 5;
        if (keyIsDown(RIGHT_ARROW)) this.x += 5;
        if (keyIsDown(UP_ARROW)) this.y -= 5;
        if (keyIsDown(DOWN_ARROW)) this.y += 5;
        
        // Keep player within canvas bounds
        this.x = constrain(this.x, 0, width);
        this.y = constrain(this.y, 0, height);
    }

    display() {
        image(tCellImage, this.x, this.y, this.size, this.size);
    }

    hits(pathogen) {
        let d = dist(this.x, this.y, pathogen.x, pathogen.y);
        return d < this.size / 2 + pathogen.size / 2;
    }
}
