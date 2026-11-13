class Platform {
  //constructor: set position, size, type and broken status
  constructor(x, y, w, h, type) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.type = type; //"normal","bouncy","moving","fragile"
    this.broken = false; //only for fragile platforms
    this.moveSpeed = 2;
  }
}
//render platform woth colour based on its type
draw();
{
  noStroke();
  if (this.type === "normal") {
    fill(80, 180, 80);
  } else if (this.type === "bouncy") {
    fill(255, 180, 50);
  } else if (this.type === "moving") {
    fill(70, 130, 180);
  } else if (this.type === "fragile") {
    fill(200, 80, 80);
  }
  rect(this.x, this.y, this.width, this.height);
}
