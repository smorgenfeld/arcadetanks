class Tank {
  constructor(x,y) {
    this.shape = Matter.Bodies.circle(x+40,y+120, 40, {
      density: .001,
      friction: 0.97,
      restitution: .5,
      frictionAir: 0.2,
      inertia: Infinity
    });
    Matter.World.add(world,this.shape);
    this.health = 100;
    this.width = 80;
    this.height = 160;
    this.mass = 1000;
    this.thrust = 50000;
    this.a = this.thrust / this.mass;
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
    this.acc = 3;
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
    this.targettheta = Math.atan2((this.target.y - this.center.y), (this.target.x - this.center.x)) + Math.PI/2;
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
      Matter.Body.applyForce(this.shape, {x:this.width/2,y:this.height/2},{x:this.thrust*-ANG,y:this.thrust*-ANG})
      this.bot.theta = 7*Math.PI/4;
    }
    else if (this.dir.f && this.dir.r) {
      Matter.Body.applyForce(this.shape, {x:this.width/2,y:this.height/2},{x:this.thrust*ANG,y:this.thrust*-ANG})
      this.bot.theta = Math.PI/4;
    }
    else if (this.dir.b && this.dir.l) {
      Matter.Body.applyForce(this.shape, {x:this.width/2,y:this.height/2},{x:this.thrust*-ANG,y:this.thrust*ANG})
      this.bot.theta = 5*Math.PI/4;
    }
    else if (this.dir.b && this.dir.r) {
      Matter.Body.applyForce(this.shape, {x:this.width/2,y:this.height/2},{x:this.thrust*ANG,y:this.thrust*ANG})
      this.bot.theta = 3*Math.PI/4;
    }
    else if (this.dir.b) {
      Matter.Body.applyForce(this.shape,{x:this.width/2,y:this.height/2}, {x:0,y:this.thrust*ANG})
      this.bot.theta = Math.PI;
    }
    else if (this.dir.f) {
      Matter.Body.applyForce(this.shape, {x:this.width/2,y:this.height/2},{x:0,y:this.thrust*-ANG})
      this.bot.theta = 0;
    }
    else if (this.dir.l) {
      Matter.Body.applyForce(this.shape, {x:this.width/2,y:this.height/2},{x:this.thrust*-ANG,y:0})
      this.bot.theta = 3*Math.PI/2;
    }
    else if (this.dir.r) {
      Matter.Body.applyForce(this.shape, {x:this.width/2,y:this.height/2},{x:this.thrust*ANG,y:0})
      this.bot.theta = Math.PI/2;
    }
    else {
      this.shape.velocity.y *= 0.97;
      this.shape.velocity.x *= 0.97;
    }
    if (this.v.x > ANG * this.v.max) {this.shape.x = this.v.max * ANG}
    else if (this.v.x < ANG * -this.v.max) {this.v.x = -this.v.max * ANG}
    if (this.v.y > ANG * this.v.max) {this.v.y = this.v.max * ANG}
    else if (this.v.y < ANG * -this.v.max) {this.v.y = -this.v.max * ANG}
    if (this.firing) {
      if (this.firetime.cur >= this.firetime.max) {
        this.firetime.cur = 0;
  			projlist.push(new Projectile(this.center.x + 50*Math.cos(this.top.theta-Math.PI/2),this.center.y + 50*Math.sin(this.top.theta-Math.PI/2),this.target.x,this.target.y,this.top.theta - Math.PI/2 + Math.random()/this.acc - Math.random()/this.acc,this));
        Matter.Body.applyForce(projlist[projlist.length-1].shape, {x:this.width/2,y:this.height/2},{x:Math.sin(this.top.theta) * 10000,y:-Math.cos(this.top.theta) * 10000})
        if (this !== p) {
          console.log(projlist[projlist.length-1].shape)//projlist[projlist.length-1].top.theta)
        }
        Matter.Body.applyForce(this.shape, {x:this.width/2,y:this.height/2},{x:-Math.sin(this.top.theta) * 10000,y:Math.cos(this.top.theta) * 10000})
      }
      else {
        this.firetime.cur++;
      }
    }
    this.x = this.shape.position.x-40;
    this.y = this.shape.position.y-120;
    this.center.x = this.x + 40;
    this.center.y = this.y + 120;
    this.rx = this.x - p.camera.x;
    this.ry = this.y - p.camera.y;
    this.ax = this.rx + 40;
    this.ay = this.ry + 120;
    //ctx.arc(this.ax, this.ay, 40, 0, 2 * Math.PI, true);
    //ctx.stroke();
    for (var i = 0; i < projlist.length; i++) {
      if (projcollision(this,projlist[i])) {
        //projlist[i].kill();
      }
    }
    this.dodifferent();
    this.bot.update();
    this.top.update();
  }
};
function projcollision(par, proj) {
  if (proj.par !== par && Math.sqrt(Math.pow(par.center.x - proj.x, 2) + Math.pow(par.center.y - proj.y,2)) < 80) {
    this.health -= proj.life;
    proj.dead = true;
  }
}
