function gettank() {
  tank = {
    width: 20,
    height:20,
    x: 0,
    y: 0,
    rx: wwidth/2,
    ry: wheight/2,
    btheta: 0,
    ttheta: 0,
    dir: {
      f: false,
      b: false,
      r: false,
      l: false,
      reset: function() {
        this.dir.f = false;
        this.dir.b = false;
        this.dir.r = false;
        this.dir.l = false;
      }
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
    },
  }
  return tank;
}

