function getmap() {
  var map = [
    [1,1,1,1,1,1],
    [3,0,0,0,0,3],
    [3,0,0,0,0,3],
    [1,1,1,1,1,1],
  ]
  var out = {
    map: map,
    size: 32,
    update: function() {
      for (var i = 0; i < Math.floor(700/32); i++) {
        for (var j = 0; j < Math.floor(500/32); j++) {
          ctx.drawImage(
            "resources/desert32.png",
            0,0,32,32,i*32,j*32,32,32
          );
        }
      }
    }
  }
  return out;
}
