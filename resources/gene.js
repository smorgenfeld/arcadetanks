class gene {
  constructor(length, depth, old = false, ingene = []) {
    if (!old) {
      this.gene = [];
      for (var i = 0; i < length; i++) {
        this.gene.push(randint(0,1));
      }
      while (depth != genesize(this.gene)) {
        if (depth > genesize(this.gene)) {
          this.gene[randint(0,this.gene.length-1)] = 1;
        }
        else {
          this.gene[randint(0,this.gene.length-1)] = 0;
        }
      }
    }
    else {
      this.gene = ingene;
    }
  }
  combine(other) {
    var switched = false;
    var newgene = [];
    for (var i = 0; i < this.gene.length; i++) {
      if (switched && Math.random() < .7) {
        newgene.push(this.gene[i]);
      }
      else {
        switched = true;
        newgene.push(other.gene[i]);
      }
    }
    return new gene(this.gene.length, 0, true, newgene);
  }
}
function genesize(gene) {
  return gene.reduce((a, b) => a + b, 0);
}
