
const rail = extendContent(Block, "rail", {
  draw(tile) {
    Draw.rect(this.rotateRegion[tile.rotation()%2], tile.drawx(), tile.drawy());
  },
  drawRequestRegion(req, list){
    Draw.rect(this.rotateRegion[req.rotation%2], req.drawx(), req.drawy());
  },
  load(){
    this.super$load();
    this.rotateRegion=[];
    for(var i=0;i<2;i++){
      this.rotateRegion.push(Core.atlas.find(this.name+"-"+i));
    }
  }
});
