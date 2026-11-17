class Platform {
  /**
   * Create a platform instance
   * @param {number} x - X coordinate
   * @param {number} y - Y coordinate
   * @param {number} w - Platform width
   * @param {number} h - Platform height
   * @param {string} type - normal, bouncy, moving, fragile
   * @param {number} moveSpeed - horizontal speed for moving platform
   */
  constructor(x, y, w, h, type, moveSpeed = 2) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.type = type;
    this.moveSpeed = moveSpeed;
    this.broken = false;
    this.active = true;
  }

  /**
   * Update platform each frame
   */
  update() {
    this.y += scrollSpeed;
    if (!this.active) return;

    if (this.type === "moving") {
      this.x += this.moveSpeed;
      if (this.x <= 0 || this.x + this.width >= width) {
        this.moveSpeed *= -1;
      }
    }

    if (this.broken) {
      this.active = false;
    }
  }

  /**
   * Collision detection with player
   * @param {Player} player
   * @returns {boolean}
   */
  checkCollision(player) {
    if (!this.active) return false;

    const playerBottom = player.y + player.height;
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
    return false;
  }

  /**
   * Trigger effect when player lands
   * @param {Player} player
   */
  onLand(player) {
    if (this.type === "bouncy") {
      player.velocityY = -12;
    } else if (this.type === "fragile") {
      this.broken = true;
    } else if (this.type === "moving") {
      player.x += this.moveSpeed;
    }
  }

  /**
   * Draw platform based on its type
   */
  draw() {
    if (!this.active) return;
    noStroke();
    if (this.type === "normal") {
      fill(80, 180, 80);
    } else if (this.type === "moving") {
      fill(70, 140, 210);
    } else if (this.type === "fragile") {
      fill(200, 130, 70);
    } else if (this.type === "bouncy") {
      fill(220, 90, 160);
    }
    rect(this.x, this.y, this.width, this.height);
  }
}
