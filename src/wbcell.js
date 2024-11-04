class WhiteBloodCell {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 35; // Set size for white blood cells
        this.speed = 1.5; // Speed at which white blood cells move
    }

    move() {
        // Move randomly to simulate patrolling
        this.x += random(-this.speed, this.speed);
        this.y += random(-this.speed, this.speed);

        // Keep WBC within canvas bounds
        this.x = constrain(this.x, 0, width);
        this.y = constrain(this.y, 0, height);
    }

    display() {
        image(wbCellImage, this.x, this.y, this.size, this.size);
    }

    hits(pathogen) {
        let d = dist(this.x, this.y, pathogen.x, pathogen.y);
        return d < this.size / 2 + pathogen.size / 2;
    }
}