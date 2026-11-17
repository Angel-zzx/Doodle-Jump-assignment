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
  platforoms.push(new Platform(width / 2 - 40, height - 40, 80, 15, "normal"));

  //generate random platforms of different types
  for (let i = 0; i < 7; i++) {
    let randX = random(20, width - 100);
    let randY = random(40, height - 180);
    let typrList = ["normal", "moving", "fragile", "bouncy"];
    let randType = random(typeList);
    platforms.push(new Platform(randX, randY, 80, 15, randType));
  }
}
