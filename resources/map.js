function getmap(width, height) {
  var map = [
    [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3],
    [15,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,17],
    [15,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,17],
    [15,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,17],
    [15,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,17],
    [15,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,17],
    [15,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,17],
    [15,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,17],
    [15,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,17],
    [15,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,17],
    [15,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,17],
    [15,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,17],
    [15,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,17],
    [29,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,31],
  ]
  var out = {
    map: generatemap(width,height),
    tsize: 32,
    tosize: 64,
    height: height,
    pheight: height * 64,
    width: width,
    pwidth: width * 64,
    tileAtlas: new Image(448,96),
    update: function() {
      var startCol = Math.floor(p.camera.x/this.tosize);
      var endCol = Math.min(startCol + (p.camera.width/this.tosize)+1,this.width - 1);
      var startRow = Math.floor(p.camera.y/this.tosize);
      var endRow = Math.min(startRow + (p.camera.height/this.tosize)+1,this.height - 1);
      var offsetX = -p.camera.x + startCol * this.tosize;
      var offsetY = -p.camera.y + startRow * this.tosize;

      for (var c = startCol; c <= endCol; c++) {
        for (var r = startRow; r <= endRow; r++) {
          var tile = this.map[r][c];
          var x = (c - startCol) * this.tosize + offsetX;
          var y = (r - startRow) * this.tosize + offsetY;
          if (tile != 0) {
            var tilenumz = this.gettile(tile);
            ctx.drawImage(
              this.tileAtlas,
              tilenumz[0],
              tilenumz[1],
              this.tsize,
              this.tsize,
              Math.round(x),
              Math.round(y),
              this.tosize,
              this.tosize
            );
          }
        }
      }
    },
    gettile: function(num) {
      var out = [0,1]
      if (num <= 14 && num >= 0) {
        out[0] = num;
      }
      else if (num > 14 && num <= 28) {
        out[0] = num - 14;
        out[1] = 2;
      }
      else {
        out[0] = num - 28;
        out[1] = 3
      }
      out[0] = (out[0] - 1) * this.tsize;
      out[1] = (out[1] - 1) * this.tsize;
      return out;
    }
  }
  out.tileAtlas.src = "resources/desert32.png";
  return out;
}
function generatemap(width,height) {
  var out = [];
  for (var c = 0; c < width; c++) {
    out.push([]);
    for (var r = 0; r < height; r++) {
      var curout = 0;
      if (r == 0 && c == 0) {curout = 1}
      else if (c == height - 1 && r == 0) {curout = 29}
      else if (c == 0 && r == width-1) {curout = 3}
      else if (c == height - 1 && r == width - 1) {curout = 31}
      else if (c == 0) {curout = 2}
      else if (c == height - 1) {curout = 30}
      else if (r == 0) {curout = 15}
      else if (r == width - 1) {curout = 17}
      else {curout = 16}
      out[c].push(curout);
    }
  }
  return out;
}
