class Projectile {
  constructor(x,y,tx,ty,theta,par) {
    this.par = par;
    this.x = x;
    this.y = y;
    this.tx = tx;
    this.ty = ty;
    this.width = 10;
    this.height = 10;
    this.rx = this.x - p.camera.x;
    this.ry = this.y - p.camera.y;
    this.ax = this.rx + this.width/2;
    this.ay = this.ry + this.height/2;
    this.dead = false;
    this.theta = theta;//Math.atan2((this.ty - this.ay), (this.tx - this.ax)) + Math.PI/2;
    this.life = 100;
    this.polygon = [[0,0],[0,0],[0,0],[0,0]];
    this.v = {
      x: 0,
      y: 0,
      max: 5,//Math.sqrt(Math.pow(par.v.x,2)+Math.pow(par.v.y,2)),
    }
  }
  updatepolygon() {
     var poly = [[this.rx,this.ry],[this.rx,this.ry+this.height],[this.rx+this.width,this.ry+this.height],[this.rx+this.width,this.ry]];
     for (var i = 0; i < poly.length; i++) {
       var out = rotate_point(poly[i][0], poly[i][1], this.ax, this.ay, this.theta);
       poly[i][0] = out.x;
       poly[i][1] = out.y;
     }
     return poly;
  }
  update() {
    if (!this.dead) {
      this.life -= 1;
      if (this.life <= 0) {
        this.dead = true;
      }
      this.v.x = Math.cos(this.theta) * this.v.max;
      this.v.y = Math.sin(this.theta) * this.v.max;
      this.x += this.v.x;
      this.y += this.v.y;
      this.rx = this.x - p.camera.x;
      this.ry = this.y - p.camera.y;
      this.ax = this.rx + this.width/2;
      this.ay = this.ry + this.height/2;
      this.polygon = this.updatepolygon();
      for (var i = 0; i < this.polygon.length; i++) {
          if (i < this.polygon.length-1) {
              ctx.moveTo(this.polygon[i][0],this.polygon[i][1]);
              ctx.lineTo(this.polygon[i+1][0],this.polygon[i+1][1]);
            }
            else {
              ctx.moveTo(this.polygon[i][0],this.polygon[i][1]);
              ctx.lineTo(this.polygon[0][0],this.polygon[0][1]);
            }
        }
        ctx.stroke();
      }
    }
  }
  function rotate_point(pointX, pointY, originX, originY, angle) {
    //http://jsfiddle.net/dahousecat/4TtvU/
    //angle = angle * Math.PI / 180.0;
    return {
      x: Math.cos(angle) * (pointX-originX) - Math.sin(angle) * (pointY-originY) + originX,
      y: Math.sin(angle) * (pointX-originX) + Math.cos(angle) * (pointY-originY) + originY
    };
  }
