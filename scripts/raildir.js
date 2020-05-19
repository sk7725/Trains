
const raildir = extendContent(Block, "raildir", {
  draw(tile) {
    Draw.rect(this.rotateRegion[tile.rotation()], tile.drawx(), tile.drawy());
  },
  drawRequestRegion(req, list){
    var reg=this.rotateRegion[req.rotation];
    Draw.rect(reg, req.drawx(), req.drawy(), reg.getWidth() * req.animScale * Draw.scl, reg.getHeight() * req.animScale * Draw.scl, 0);
  },
  load(){
    this.super$load();
    this.rotateRegion=[];
    for(var i=0;i<4;i++){
      this.rotateRegion.push(Core.atlas.find(this.name+"-"+i));
    }
  }
});
