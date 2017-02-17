function gettank() {
  tank = {
    width: 20,
    height: 20,
    x: 0,
    y: 0,
    rx: wwidth/2 - 10,
    ry: wheight/2 - 10,
    ax: wwidth/2,
    ay: wheight/2,
    btheta: 0,
    ttheta: 0,
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
    update: function() {
      var ANG = 0.707107;
      this.v.y = 0;
      this.v.x = 0;
      if (this.dir.f && this.dir.l) {
        this.v.x = this.v.max * -ANG;
        this.v.y = this.v.max * ANG;
      }
      else if (this.dir.f && this.dir.r) {
        this.v.x = this.v.max * ANG;
        this.v.y = this.v.max * ANG;
      }
      else if (this.dir.b && this.dir.l) {
        this.v.x = this.v.max * -ANG;
        this.v.y = this.v.max * -ANG;
      }
      else if (this.dir.b && this.dir.r) {
        this.v.x = this.v.max * ANG;
        this.v.y = this.v.max * -ANG;
      }
      else if (this.dir.b) {
        this.v.y = -this.v.max;
      }
      else if (this.dir.f) {
        this.v.y = this.v.max;
      }
      else if (this.dir.l) {
        this.v.x = -this.v.max;
      }
      else if (this.dir.r) {
        this.v.x = this.v.max;
      }
      this.top.update();
      this.bot.update();
    },
  }
  tank.bot = newblock(tank, "bottom"),
  tank.top = newblock(tank, "top")
  return tank;
}
