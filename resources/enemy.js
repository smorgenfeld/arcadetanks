class Enemy extends Tank {
  constructor(x,y) {
    super(x,y);
    this.rx = this.x - p.x;
    this.ry = this.y - p.y;
    this.ax = this.rx + 40;
    this.ay = this.ry + 120;
    this.bot = newblock(this, "bottom");
    this.top = newblock(this, "top");
    this.v.max = 1;
    this.happy = false;
  }
  dodifferent() {
    this.rx = this.x - p.x;
    this.ry = this.y - p.y;
    this.ax = this.rx + 40;
    this.ay = this.ry + 120;
  }
  doai() {
    this.center.x = this.x + 40;
    this.center.y = this.y + 120;
    this.target.x = p.ax;
    this.target.y = p.ay;
    var tx = this.target.x;
    var ty = this.target.y;
    this.dir.reset(this);
    if (!this.happy && Math.sqrt(Math.pow(tx-this.ax,2) + Math.pow(ty-this.ay,2)) > 250) {
      this.togglefiring(false);
      if (p.rx - 10 > this.rx) {
        this.dir.r = true;
      }
      if (p.rx + 10<= this.rx) {
        this.dir.l = true;
      }
      if (p.ry - 10< this.ry) {
        this.dir.f = true;
      }
      if (p.ry + 10>= this.ry) {
        this.dir.b = true;
      }
    }
    else if (this.happy && Math.sqrt(Math.pow(tx-this.ax,2) + Math.pow(ty-this.ay,2)) > 350) {
      this.happy = false;
      this.togglefiring(false);
    }
    else {
      if (!this.happy) {
        this.togglefiring(true);
      }
      this.happy = true;
    }
  }
}
