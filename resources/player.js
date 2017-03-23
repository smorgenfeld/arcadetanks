class Player extends Tank {
  constructor(x,y) {
    super(x,y)
    this.rx = wwidth/2-40;
    this.ry = wheight/2-120;
    this.ax = wwidth/2;
    this.ay = wheight/2;
    this.bot = newblock(this, "bottom");
    this.top = newblock(this, "top");
    this.mass = 1000;
    this.v.max = 10;
    this.a = 3
    this.camera = {
      x: 0,
      y: 0,
      width: win.width,
      height: win.height,
      maxY: map.pheight - win.height,
      maxX: map.pwidth - win.width,
    };
  }
  doai() {
    this.center.x = this.x + 450;
    this.center.y = this.y + 350;
  }
  dodifferent() {
    this.x = Math.max(0, Math.min(this.x, this.camera.maxX));
    this.y = Math.max(0, Math.min(this.y, this.camera.maxY));
    this.camera.x = this.x;
    this.camera.y = this.y;
  }
}
