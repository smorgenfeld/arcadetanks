class structure {
  constructor(player, wavesize) {
    this.round = 0;
    this.p = player;
    this.size = wavesize
  }
  update() {
    var cont = false;
    for (var i = 0; i < enlist.length - 1; i++) {
      if (enlist[i].dead == false) {
        cont = true;
      }
    }
    if (!cont) {
      this.round += 1;
      if (this.round == 1) {
        for (var i = 0; i < this.size; i++) {
          enlist.push(new Enemy(i*100,100));
        }
      }
      else {
        var best = [];
        var tempindex = 0;
        var realindex = -1;
        for (var j = 0; j < 2; j++) {
          best.push(enlist[0]);
          for (var i = 1; i < enlist.length; i++) {
            Matter.World.remove(world, enlist[i].shape)
            if (best[j].damdelt < enlist[i].damdelt && i != realindex) {
              best[j] = enlist[i];
              tempindex = i;
            }
          }
          realindex = tempindex;
          tempindex = 0;
        }
        for (var i = 0; i < world.bodies.length; i++) {
          console.log(world.bodies[i])
        }
        enlist = [];
        for (var i = 0; i < this.size; i++) {
          enlist.push(new Enemy(i*100,100,[best[0].gene.bulthrust.g.combine(best[1].gene.bulthrust.g),best[0].gene.bulsize.g.combine(best[1].gene.bulsize.g)]));
        }
        var avg = [0,0];
        for (var i = 0; i < this.size; i++) {
          avg[0] += genesize(enlist[i].gene.bulsize.g.gene);
          avg[1] += genesize(enlist[i].gene.bulthrust.g.gene);
        }
        avg[0] /= enlist.length;
        avg[1] /= enlist.length;
        console.log(avg);
      }
    }
  }
}
function genesize(gene) {
  return gene.reduce((a, b) => a + b, 0);
}
