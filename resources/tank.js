function gettank() {
  tank = {
    width: 80,
    height: 160,
    x: 0,
    y: 0,
    rx: wwidth/2-40,
    ry: wheight/2-120,
    ax: wwidth/2,
    ay: wheight/2,
    theta: 0,
    bot: null,
    top: null,
    dir: {
      f: false,
      b: false,
      r: false,
      l: false,
      reset: function() {
        p.dir.f = false;
        p.dir.b = false;
        p.dir.r = false;
        p.dir.l = false;
      },
    },
    target: {
      x: 0,
      y: 0,
    },
    v: {
      x: 0,
      y: 0,
      max: 5,
    },
    camera: {
      x: 0,
      y: 0,
      width: win.width,
      height: win.height,
      maxY: map.pheight - win.height,
      maxX: map.pwidth - win.width,
    },
    update: function() {
      this.top.theta = Math.atan2((this.target.y - this.ay), (this.target.x - this.ax)) + Math.PI/2;
      var ANG = 0.707107;
      this.v.y *= 0.9;
      this.v.x *= 0.9;
      if (this.dir.f && this.dir.l) {
        this.v.x = this.v.max * -ANG;
        this.v.y = this.v.max * ANG;
        this.bot.theta = 7*Math.PI/4;
      }
      else if (this.dir.f && this.dir.r) {
        this.v.x = this.v.max * ANG;
        this.v.y = this.v.max * ANG;
        this.bot.theta = Math.PI/4;
      }
      else if (this.dir.b && this.dir.l) {
        this.v.x = this.v.max * -ANG;
        this.v.y = this.v.max * -ANG;
        this.bot.theta = 5*Math.PI/4;
      }
      else if (this.dir.b && this.dir.r) {
        this.v.x = this.v.max * ANG;
        this.v.y = this.v.max * -ANG;
        this.bot.theta = 3*Math.PI/4;
      }
      else if (this.dir.b) {
        this.v.y = -this.v.max;
        this.bot.theta = Math.PI;
      }
      else if (this.dir.f) {
        this.v.y = this.v.max;
        this.bot.theta = 0;
      }
      else if (this.dir.l) {
        this.v.x = -this.v.max;
        this.bot.theta = 3*Math.PI/2;
      }
      else if (this.dir.r) {
        this.v.x = this.v.max;
        this.bot.theta = Math.PI/2;
      }
      this.x += this.v.x;
      this.y -= this.v.y;
      this.x = Math.max(0, Math.min(this.x, this.camera.maxX));
      this.y = Math.max(0, Math.min(this.y, this.camera.maxY));
      this.camera.x = this.x;
      this.camera.y = this.y;
      this.bot.update();
      this.top.update();
    },
  }
  tank.bot = newblock(tank, "bottom");
  tank.top = newblock(tank, "top");
  return tank;
}
