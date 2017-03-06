function getmap() {
  var map = [
    [1,1,1,1,1,1,1,1,1,1],
    [3,0,0,2,3,0,0,0,0,3],
    [3,0,0,0,0,0,0,0,0,3],
    [3,0,0,0,1,1,0,0,0,3],
    [3,0,0,0,1,1,0,0,0,3],
    [3,0,0,0,0,2,3,4,5,3],
    [3,0,0,0,0,0,0,0,0,3],
    [1,1,1,1,1,1,1,1,1,1],
  ]
  var out = {
    map: map,
    tsize: 64,
    height: map.length,
    pheight: map.length * 64,
    width: map[0].length,
    pwidth: map[0].length * 64,
    tileAtlas: new Image(448,96),
    update: function() {
      var startCol = Math.floor(p.camera.x/this.tsize);
      var endCol = startCol + (p.camera.width/this.tsize);
      var startRow = Math.floor(p.camera.y/this.tsize);
      var endRow = startRow + (p.camera.height/this.tsize);
      var offsetX = -p.camera.x + startCol * this.tsize;
      var offsetY = -p.camera.y + startRow * this.tsize;

      for (var c = startCol; c < endCol; c++) {
        for (var r = startRow; r < endRow; r++) {
          var tile = this.map[r][c];
          var x = (c - startCol) * this.tsize + offsetX;
          var y = (r - startRow) * this.tsize + offsetY;
          if (tile != 0) {
            //console.log(x,y)
            ctx.drawImage(
              this.tileAtlas,
              (tile - 1) * this.tsize,
              0,
              this.tsize,
              this.tsize,
              Math.round(x),
              Math.round(y),
              this.tsize,
              this.tsize
            );
          }
        }
      }
    }
  }
  out.tileAtlas.src = "resources/desert32.png";
  return out;
}
