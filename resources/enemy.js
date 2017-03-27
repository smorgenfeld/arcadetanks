class Enemy extends Tank {
  constructor(x,y) {
    super(x,y);
    this.bot = newblock(this, "bottom");
    this.top = newblock(this, "top");
    this.v.max = 1;
    //this.thrust /= 5;
    this.happy = false;
    this.gtfo = false;
  }
  dodifferent() {
    //this.ax = this.rx + 40;
    //this.ay = this.ry + 120;
  }
  doai() {
    this.dir.reset(this);
    if (!this.stopped) {
      var tx = this.target.x = p.center.x;
      var ty = this.target.y = p.center.y;
      if (!this.happy && Math.sqrt(Math.pow(tx-this.center.x,2) + Math.pow(ty-this.center.y,2)) > 250) {
        this.togglefiring(false);
        this.goto(tx,ty);
      }
      else if (this.happy && Math.sqrt(Math.pow(tx-this.center.x,2) + Math.pow(ty-this.center.y,2)) > 350) {
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
    else {
      if (Math.sqrt(Math.pow(this.target.x-this.center.x,2) + Math.pow(this.target.y-this.center.y,2)) < 10) {
        this.stopped = this.gtfo = false;
      }
      if (!this.gtfo) {
        this.target.x = randint(-10,10)*10 + p.x;
        this.target.y = randint(-10,10)*10 + p.y;
      }
      this.goto(this.target.x,this.target.y);
    }
  }
  goto(tx,ty) {
    if (tx - 10 > this.center.x) {
      this.dir.r = true;
    }
    if (tx + 10 <= this.center.x) {
      this.dir.l = true;
    }
    if (ty - 10 < this.center.y) {
      this.dir.f = true;
    }
    if (ty + 10 >= this.center.y) {
      this.dir.b = true;
    }
  }
}
