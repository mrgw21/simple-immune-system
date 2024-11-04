// Global variables
let tCellImage, bacteriaImage, virusImage, wbCellImage, bgImage;
let player;             // T-cell (the main player)
let pathogens = [];     // Array to store pathogens
let wbCells = [];       // Array to store white blood cells

const backgroundMusic = new Audio('./assets/sounds/komiku.mp3');  // Update the path and filename
backgroundMusic.loop = true;  // Set looping
backgroundMusic.volume = 0.5;  // Adjust volume as needed
backgroundMusic.play();

window.addEventListener('load', () => {
    backgroundMusic.play().catch(error => {
        console.log("Autoplay prevented. Waiting for user interaction to start music.");
        // Fallback: Start music on the first click or key press if autoplay is blocked
        window.addEventListener('click', startMusic);
        window.addEventListener('keydown', startMusic);
    });
});

function startMusic() {
    backgroundMusic.play();
    // Remove the listeners after music starts to avoid multiple triggers
    window.removeEventListener('click', startMusic);
    window.removeEventListener('keydown', startMusic);
}

function preload() {
    // Load images
    tCellImage = loadImage('assets/images/tcell.png');
    bacteriaImage = loadImage('assets/images/bacteria.png');
    virusImage = loadImage('assets/images/virus.png');
    wbCellImage = loadImage('assets/images/wbcell.png');
    bgImage = loadImage('assets/images/background.png');
}

function setup() {
    createCanvas(800, 600);
    player = new Player(width / 2, height / 2); // Initialize T-cell in center
    spawnWBC(); // Spawn an initial white blood cell
}

function draw() {
    background(bgImage); // Draw background

    // Display and move the player
    player.move();
    player.display();

    // Display and move pathogens
    for (let i = pathogens.length - 1; i >= 0; i--) {
        pathogens[i].move();
        pathogens[i].display();

        // Check for collision with player (T-cell)
        if (player.hits(pathogens[i])) {
            pathogens.splice(i, 1); // Destroy pathogen if hit by player
        }
    }

    // Display and move white blood cells
    for (let wbCell of wbCells) {
        wbCell.move();
        wbCell.display();

        // White blood cell attacks pathogens
        for (let i = pathogens.length - 1; i >= 0; i--) {
            if (wbCell.hits(pathogens[i])) {
                pathogens.splice(i, 1); // Destroy pathogen if hit by WBC
            }
        }
    }
}

// Spawn pathogens periodically
function spawnPathogen() {
    let x = random(width);
    let y = random(height);
    let type = random(["bacteria", "virus"]); // Randomly choose pathogen type
    pathogens.push(new Pathogen(x, y, type));
}

// Spawn white blood cells periodically
function spawnWBC() {
    let x = random(width);
    let y = random(height);
    wbCells.push(new WhiteBloodCell(x, y));
}

// Spawn pathogens every 2 seconds
setInterval(spawnPathogen, 2000);

// Spawn white blood cells every 5 seconds
setInterval(spawnWBC, 5000);
