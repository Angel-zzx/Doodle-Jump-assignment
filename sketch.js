// sketch. js
// Global game variables
let player;
let platforms = [];
const scrollSpeed = 2; //golbal scroll speed for platforms

//Game state:"start","playing","gameOver"
let gameState = "start";
let score = 0;
let startTime = 0;
let finalScore = 0;
let finalTime = 0;
let history = []; // store every finished run :{score,time}
function setup() {
  // create game canvas
  createCanvas(400, 600);
  prepareScene(); //build platforms and player, but do not start the timer

  // Build player and platform for a fresh game(timer is not reset here)
  function prepareScene() {
    score = 0;
    platforms = [];
    player = new Player(width / 2, height - 80);
  }

  // create the starting normal platform under player
  platforms.push(new Platform(width / 2 - 40, height - 40, 80, 15, "normal"));

  //generate random platforms of different types
  for (let i = 0; i < 7; i++) {
    let randX = random(20, width - 100);
    let randY = random(40, height - 180);
    let typeList = ["normal", "moving", "fragile", "bouncy"];
    let randType = random(typeList);
    platforms.push(new Platform(randX, randY, 80, 15, randType));
  }
}

// Reser all game data for new game or restart
function resetGame() {
  score = 0;
  startTime = millis();
  platforms = [];

  // Spawn player at starting position
  Player = new Player(wideth / 2, height - 80);

  // Spawn platform under the player
  platforms.push(new Platform(width / 2 - 40, height - 40, 80, 15, "normal"));

  // Generate initial random platforms
  for (let i = 0; i < 7; i++) {
    let randX = random(20, width - 100);
    let randY = random(40, height - 180);
    let typeList = ["normal", "moving", "fragile", "bouncy"];
    let randType = random(typeList);
    platforms.push(new Platform(randX, randY, 80, 15, randType));
  }
}
// Start a new run: reset timer and switch to playing
function startGame() {
  prepareScene();
  startTime = millis();
  gameState = "playing";
}
//Save the finished run into history and switch to game over screen
function endGame() {
  finalScore = score;
  finalTime = floor((millis() - startTime) / 1000);
  history.push({ score: finalScore, time: finalTime });
  gameState = "gameOver";
}

function draw() {
  // set background color
  background(135, 206, 235);

  // update player movement
  player.updateHorizontal();
  player.updateVertical();

  // handle landing collision logic between player and all platforms
  player.resolvePlatformLandings(platforms);

  //draw the player
  player.draw();

  // loop through all platforms to update and render
  for (let p of platforms) {
    p.update();
    p.draw();
  }

  // camera scroll logic, move everything down when player jumps upward
  if (player.y < height / 2) {
    let offset = height / 2 - player.y;
    player.y += offset;
    for (let p of platforms) {
      p.y += offset;
      //Regenerate platform at top when it goes off the bottom of screen
      if (p.y > height) {
        p.y = random(-60, -10);
        p.x = random(20, width - 100);
        let typeList = ["normal", "moving", "fragile", "bouncy"];
        p.type = random(typeList);
        p.active = true;
        p.broken = false;
      }
    }
  }
  // Death condition: player falls out of canvas bottom
  if (player.y > height) {
    gameState = "gameOver";
  }

  // Show score and survival time
  fill(0);
  textSize(16);
  textAlign(Left, TOP);
  let timePassed = floor((millis() - startTime) / 1000);
  text("Score:${score}", 10, 10);
  text("Time: ${timePassed} s", 10, 30);
}
if (gameState === "gameOver") {
  // Draw game over screen
  textAlign(CENTER, CENTER);
  fill(255, 50, 50);
  textSize(32);
  text("Game Over", width / 2, height / 2 - 40);
  fill(255);
  textSize(20);
  text("Final Score: ${score}", width / 2, height / 2);
  let timePassed = floor((millis() - startTime) / 1000);
  text("Survive Time: ${timePasswd}s", width / 2, height / 2 + 30);
  textSize(18);
  text("Press SPACE to Play Again", width / 2, height / 2 + 70);
}
