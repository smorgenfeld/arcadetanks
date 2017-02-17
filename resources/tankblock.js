function newblock(par,type) {
	var block = {
		rx: par.rx,
		ry: par.ry,
		type: type,
		polygon: [[0,0],[0,0],[0,0],[0,0]],
		img: null,
		par: par,
		update: function() {
			this.polygon = this.updatepolygon();
      ctx.save();
      ctx.translate(this.par.ax, this.par.ay);
      ctx.rotate(par.theta);
      ctx.drawImage(this.img,0,0);
      ctx.stroke();
      ctx.restore();
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
      },
      updatepolygon: function() {
	       var poly = [[this.rx,this.ry],[this.rx,this.ry+this.par.height],[this.rx+this.par.width,this.ry+this.par.height],[this.rx+this.par.width,this.ry]];
	       for (var i = 0; i < poly.length; i++) {
	         var out = rotate_point(poly[i][0], poly[i][1], this.par.ax, this.par.ay, this.par.theta);
	         poly[i][0] = out.x;
	         poly[i][1] = out.y;
	       }
	       return poly;
     	},
    }
	if (block.type == "bottom") {
		setimg(block,1);
	}
	else if (block.type == "top") {
		setimg(block,0);
	}
	return block;
}
function rotate_point(pointX, pointY, originX, originY, angle) {
  //http://jsfiddle.net/dahousecat/4TtvU/
  //angle = angle * Math.PI / 180.0;
  return {
    x: Math.cos(angle) * (pointX-originX) - Math.sin(angle) * (pointY-originY) + originX,
    y: Math.sin(angle) * (pointX-originX) + Math.cos(angle) * (pointY-originY) + originY
  };
}

function setimg(block, index) {
  block.img = new Image(80,160);
  block.img.src = img[index];
}
