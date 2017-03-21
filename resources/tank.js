class Tank {
  constructor(x,y) {
    this.health = 100;
    this.width = 80;
    this.height = 160;
    this.x = x;
    this.y = y;
    this.rx = 0;
    this.ry = 0;
    this.ax = 0;
    this.ay = 0;
    this.center = {
      x: x,
      y: y,
    }
    this.theta = 0;
    this.bot = null;
    this.top = null;
    this.firing = false;
    this.stopped = false;
    this.firetime = {
      max: 10,
      cur: 0,
    };
    this.acc = 5;
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
      amax: .05,
    };
  }
  dodifferent() {
    return null;
  }
  doai() {
    return null;
  }
  togglefiring(way) {
    if (way == true) {
      this.firetime.cur = this.firetime.max;
    }
    this.firing = way;
  }
  update() {
    this.doai()
    this.targettheta = Math.atan2((this.target.y - this.ay), (this.target.x - this.ax)) + Math.PI/2;
    if (this.targettheta < 0) {
      this.targettheta += Math.PI*2;
    }
    var facingmtarget = this.top.theta - this.targettheta;
    var anglediff = facingmtarget;
    if (this.top.theta > Math.PI * 2) {
      this.top.theta -= Math.PI * 2;
    }
    else if (this.top.theta < -Math.PI * 2) {
      this.top.theta += Math.PI * 2;
    }
    if (Math.abs(facingmtarget) > Math.PI) {
      if (this.targettheta > this.top.theta) {
        anglediff = 1*((1*Math.PI*2 - this.top.theta) + this.targettheta);
      }
      else {
        anglediff = -1*((5*Math.PI/2 - this.top.theta) + this.targettheta);
      }
    }
    if (anglediff > Math.PI * 2) {
      anglediff -= Math.PI * 2;
      if (anglediff > Math.PI * 2) {
        anglediff -= Math.PI * 2;
      }
    }
    else if (anglediff < -Math.PI * 2) {
      anglediff += Math.PI * 2;
    }
    if (anglediff > 0) {
      if (anglediff > this.v.amax) {
        this.top.theta -= this.v.amax;
      }
      else {
        this.top.theta = this.targettheta;
      }
    }
    else {
      if (-anglediff > this.v.amax) {
        this.top.theta += this.v.amax;
      }
      else {
        this.top.theta = this.targettheta;
      }
    }
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
    if (this.firing) {
      if (this.firetime.cur >= this.firetime.max) {
        this.firetime.cur = 0;
  			projlist.push(new Projectile(this.center.x,this.center.y,this.target.x,this.target.y,this.top.theta - Math.PI/2 + Math.random()/this.acc - Math.random()/this.acc,this));
        this.v.x -= Math.sin(this.top.theta) * 1/2;
        this.v.y -= Math.cos(this.top.theta) * 1/2;
      }
      else {
        this.firetime.cur++;
      }
    }
    for (var i = 0; i < enlist.length; i++) {
      tankcollision(this, enlist[i]);
    }
    this.x += this.v.x;
    this.y -= this.v.y;
    for (var i = 0; i < projlist.length; i++) {
      if (projcollision(this,projlist[i])) {
        projlist[i].dead = true;
      }
    }
    this.dodifferent();
    this.bot.update();
    this.top.update();
  }
};
function projcollision(par, proj) {
  if (proj.par !== par && Math.sqrt(Math.pow(par.center.x - proj.x, 2) + Math.pow(par.center.y - proj.y,2)) < 80) {
    this.health -= proj.health;
    proj.dead = true;
  }
}
function tankcollision(par, other) {
  if (par !== other && Math.sqrt(Math.pow(par.center.x - other.center.x, 2) + Math.pow(par.center.y - other.center.y, 2)) < 80) {
    other.x += par.v.x;
    other.y += par.v.y;
    par.v.x *= -1/2;
    par.v.y *= -1/2;
    par.stopped = true;
  }
}
