// Global variables
let tCellImage, bacteriaImage, virusImage, wbCellImage, bgImage;
let player;
let pathogens = [];
let wbCells = [];
let score = 0;
let timer = 60;  // 1 minute in seconds
let gameOver = false;

const backgroundMusic = new Audio('./assets/sounds/komiku.mp3');
backgroundMusic.loop = true;
backgroundMusic.volume = 0.5;
backgroundMusic.play();

window.addEventListener('load', () => {
    backgroundMusic.play().catch(error => {
        console.log("Autoplay prevented. Waiting for user interaction to start music.");
        window.addEventListener('click', startMusic);
        window.addEventListener('keydown', startMusic);
    });
});

function startMusic() {
    backgroundMusic.play();
    window.removeEventListener('click', startMusic);
    window.removeEventListener('keydown', startMusic);
}

function preload() {
    tCellImage = loadImage('assets/images/tcell.png');
    bacteriaImage = loadImage('assets/images/bacteria.png');
    virusImage = loadImage('assets/images/virus.png');
    wbCellImage = loadImage('assets/images/wbcell.png');
    bgImage = loadImage('assets/images/background.png');
}

function setup() {
    createCanvas(800, 600);
    player = new Player(width / 2, height / 2);
    spawnWBC();
    setInterval(updateTimer, 1000);  // Update timer every second
}

function draw() {
    if (gameOver) {
        showGameOverModal();
        return;
    }

    background(bgImage);

    // Display and move the player
    player.move();
    player.display();

    // Display and move pathogens
    for (let i = pathogens.length - 1; i >= 0; i--) {
        pathogens[i].move();
        pathogens[i].display();

        if (player.hits(pathogens[i])) {
            pathogens.splice(i, 1);
            score += 10;  // Add points
        }
    }

    // Display and move white blood cells
    for (let wbCell of wbCells) {
        wbCell.move();
        wbCell.display();

        for (let i = pathogens.length - 1; i >= 0; i--) {
            if (wbCell.hits(pathogens[i])) {
                pathogens.splice(i, 1);
                score += 10;  // Add points
            }
        }
    }

    // Display score and timer
    displayScoreAndTimer();
}

// Display score and timer outside the canvas
function displayScoreAndTimer() {
    document.getElementById('scoreDisplay').innerText = `Score: ${score}`;
    document.getElementById('timerDisplay').innerText = `Time: ${Math.floor(timer / 60)}:${timer % 60 < 10 ? '0' : ''}${timer % 60}`;
}

// Update the timer every second
function updateTimer() {
    if (timer > 0) {
        timer--;
    } else {
        gameOver = true;
    }
}

function showGameOverModal() {
    // Create a modal div
    const modal = document.createElement('div');
    modal.id = 'gameOverModal';
    modal.innerHTML = `
        <div class="modal-content">
            <h1>Game Over!</h1>
            <p>Your Score: ${score}</p>
        </div>
    `;
    document.body.appendChild(modal);

    // Show the restart button when the game is over
    document.getElementById('restartButton').style.display = 'block';
    document.getElementById('restartButton').onclick = restartGame;
}

// Restart the game
function restartGame() {
    score = 0;
    timer = 60;
    gameOver = false;
    pathogens = [];
    wbCells = [];
    player = new Player(width / 2, height / 2);
    document.getElementById('gameOverModal').remove();
    document.getElementById('restartButton').style.display = 'none'; // Hide the button again
    displayScoreAndTimer(); // Update the score and timer display
}

function spawnPathogen() {
    let x = random(width);
    let y = random(height);
    let type = random(["bacteria", "virus"]);
    pathogens.push(new Pathogen(x, y, type));
}

function spawnWBC() {
    let x = random(width);
    let y = random(height);
    wbCells.push(new WhiteBloodCell(x, y));
}

setInterval(spawnPathogen, 2000);
setInterval(spawnWBC, 5000);