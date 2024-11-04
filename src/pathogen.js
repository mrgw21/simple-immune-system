class Pathogen {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.size = 30; // Set size for pathogens
        this.speed = 2; // Speed at which pathogen moves randomly
    }

    move() {
        // Simple random movement
        this.x += random(-this.speed, this.speed);
        this.y += random(-this.speed, this.speed);

        // Keep pathogen within canvas bounds
        this.x = constrain(this.x, 0, width);
        this.y = constrain(this.y, 0, height);
    }

    display() {
        if (this.type === "bacteria") {
            image(bacteriaImage, this.x, this.y, this.size, this.size);
        } else if (this.type === "virus") {
            image(virusImage, this.x, this.y, this.size, this.size);
        }
    }
}