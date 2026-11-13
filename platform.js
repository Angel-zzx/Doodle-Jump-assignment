class Platform {
  //constructor: set position, size, type and broken status
  constructor(x, y, w, h, type) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.type = type; //"normal","bouncy","moving","fragile"
    this.broken = false; //only for fragile platforms
  }
}
