function newblock(par,type) {
	var block = {
		rx: par.rx,
		ry: par.ry,
		type: type,
		theta: 0,
		polygon: [[0,0],[0,0],[0,0],[0,0]],
		img: null,
		par: par,
		update: function() {
			this.rx = this.par.rx;
			this.ry = this.par.ry;
			this.polygon = this.updatepolygon();
      ctx.save();
      ctx.translate(this.par.ax, this.par.ay);
      ctx.rotate(this.theta);
			ctx.translate(-this.par.ax, -this.par.ay);
			ctx.translate(this.par.rx, this.par.ry);
      ctx.drawImage(this.img,0,0);
      ctx.stroke();
      ctx.restore();
      //for (var i = 0; i < this.polygon.length; i++) {
       //		if (i < this.polygon.length-1) {
      //    		ctx.moveTo(this.polygon[i][0],this.polygon[i][1]);
      //    		ctx.lineTo(this.polygon[i+1][0],this.polygon[i+1][1]);
      //  		}
      //  		else {
      //    		ctx.moveTo(this.polygon[i][0],this.polygon[i][1]);
      //    		ctx.lineTo(this.polygon[0][0],this.polygon[0][1]);
      //  		}
      //	}
      	ctx.stroke();
      },
      updatepolygon: function() {
	       var poly = [[this.rx,this.ry],[this.rx,this.ry+this.par.height],[this.rx+this.par.width,this.ry+this.par.height],[this.rx+this.par.width,this.ry]];
	       for (var i = 0; i < poly.length; i++) {
	         var out = rotate_point(poly[i][0], poly[i][1], this.par.ax, this.par.ay, this.theta);
	         poly[i][0] = out.x;
	         poly[i][1] = out.y;
	       }
	       return poly;
     	},
    }
	if (block.type == "bottom") {
		setimg(block,0);
	}
	else if (block.type == "top") {
		setimg(block,1);
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

function inside(point, polygon) {
    // ray-casting algorithm based on
    // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html

    var x = point[0], y = point[1];

    var inside = false;
    for (var i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        var xi = polygon[i][0], yi = polygon[i][1];
        var xj = polygon[j][0], yj = polygon[j][1];

        var intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }
    return inside;
}

function setimg(block, index) {
  block.img = new Image(80,160);
  block.img.src = img[index];
}
