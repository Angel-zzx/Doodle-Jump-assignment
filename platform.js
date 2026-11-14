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
//render platform with colour based on its type
draw();
{
  noStroke();
  if (this.type === "normal") {
    fill(60, 180, 80);
  } else if (this.type === "bouncy") {
    fill(255, 180, 50);
  } else if (this.type === "moving") {
    fill(70, 130, 180);
  } else if (this.type === "fragile") {
    fill(200, 80, 80);
  }
  rect(this.x, this.y, this.width, this.height);
}
//update platform position:scroll down + horizontal bounce for moving type
update(scrollSpeed);
{
  this.y += scrollSpeed;
  if (this.type === "moving") {
    this.x += this.moveSpeed;
    //reverse direction if hitting canvas boundary
    if (this.x <= 0 || this.x + this.width >= width) {
      this.moveSpeed *= -1;
    }
  }
}
//check if player lands on this platform
checkCollision(player);
{
  const playerBottom = player.y + player.y + player.height / 2;
  const platformTop = this.y;
  if (
    player.velocityY > 0 &&
    playerBottom >= platformTop &&
    playerBottom <= platformTop + this.height &&
    player.x + player.width / 2 >= this.x &&
    player.x - player.width / 2 <= this.x + this.width
  ) {
    return true;
  }
  {
    return false;
  }
}
