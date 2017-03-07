class Tank {
  constructor(x,y) {
    this.width = 80;
    this.height = 160;
    this.x = x;
    this.y = y;
    this.rx = 0;
    this.ry = 0;
    this.ax = 0;
    this.ay = 0;
    this.theta = 0;
    this.bot = null;
    this.top = null;
    this.dir = {
      f: false,
      b: false,
      r: false,
      l: false,
      reset: function(par) {
        par.dir.f = false;
        par.dir.b = false;
        par.dir.r = false;
        par.dir.l = false;
      },
    };
    this.target = {
      x: 0,
      y: 0,
    };
    this.v = {
      x: 0,
      y: 0,
      max: 5,
    };
  }
  dodifferent() {
    return null;
  }
  doai() {
    return null;
  }
  update() {
    this.doai()
    this.top.theta = Math.atan2((this.target.y - this.ay), (this.target.x - this.ax)) + Math.PI/2;
    var ANG = 0.707107;
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
      this.v.x *= 0.97;
      this.bot.theta = Math.PI;
    }
    else if (this.dir.f) {
      this.v.y = this.v.max;
      this.v.x *= 0.97;
      this.bot.theta = 0;
    }
    else if (this.dir.l) {
      this.v.x = -this.v.max;
      this.v.y *= 0.97;
      this.bot.theta = 3*Math.PI/2;
    }
    else if (this.dir.r) {
      this.v.x = this.v.max;
      this.v.y *= 0.97;
      this.bot.theta = Math.PI/2;
    }
    else {
      this.v.y *= 0.95;
      this.v.x *= 0.95;
    }
    this.x += this.v.x;
    this.y -= this.v.y;
    this.dodifferent();
    this.bot.update();
    this.top.update();
  }
}
