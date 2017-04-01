class Player extends Tank {
  constructor(x,y) {
    super(x,y)
    this.shape.collisionFilter.category = 0x0002;
    this.bot = newblock(this, "bottom");
    this.top = newblock(this, "top");
    this.mass = 1000;
    this.v.max = 10;
    this.bulsize = 5;
    this.bulthrust = 30000;
    this.life = 10000000;
    this.firetime.max = 10;
    this.acc = 5
    this.a = 3;
    this.mouse = {
      x: 0,
      y: 0,
    }
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
    //this.shape.position.x = this.center.x - 450;
    //this.shape.position.y = this.center.y - 350;
  }
  dodifferent() {
    this.camera.x = Math.max(0, Math.min(Math.floor(((this.center.x-450) + (this.center.x-450 + (this.mouse.x-450)/4))/2), this.camera.maxX));
    this.camera.y = Math.max(0, Math.min(Math.floor(((this.center.y-350) + (this.center.y-350 + (this.mouse.y-350)/4))/2), this.camera.maxY));
    this.target.x = this.camera.x + this.mouse.x;
    this.target.y = this.camera.y + this.mouse.y;
    //this.camera.x = this.x-450;
    //this.camera.y = this.y-350;
  }
}
