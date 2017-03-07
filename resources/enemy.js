class Enemy extends Tank {
  constructor(x,y) {
    super(x,y);
    this.rx = this.x - p.x;
    this.ry = this.y - p.y;
    this.ax = this.rx + 40;
    this.ay = this.ry + 120;
    this.bot = newblock(this, "bottom");
    this.top = newblock(this, "top");
    this.v.max = 1
  }
  dodifferent() {
    this.rx = this.x - p.x;
    this.ry = this.y - p.y;
    this.ax = this.rx + 40;
    this.ay = this.ry + 120;
  }
  doai() {
    this.target.x = p.ax;
    this.target.y = p.ay;
    var tx = this.target.x;
    var ty = this.target.y;
    this.dir.reset(this);
    if (Math.sqrt(Math.pow(tx-this.ax,2) + Math.pow(ty-this.ay,2)) > 250) {
      if (p.rx > this.rx) {
        this.dir.r = true;
      }
      if (p.rx <= this.rx) {
        this.dir.l = true;
      }
      if (p.ry < this.ry) {
        this.dir.f = true;
      }
      if (p.ry >= this.ry) {
        this.dir.b = true;
      }
    }
  }
}
