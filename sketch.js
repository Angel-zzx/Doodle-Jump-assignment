// sketch. js
// Global game variables
let player;
let platforms = [];
const scrollSpeed = 2; //golbal scroll speed for platforms

function setup() {
  // create game canvas
  createCanvas(400, 600);

  // spawn player at the starting position
  player = new Player(width / 2, height - 80);

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
      //regenerate platform at top when it goes off the bottom of screen
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
}
