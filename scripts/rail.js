
const rail = extendContent(Block, "rail", {
  draw(tile) {
    Draw.rect(this.rotateRegion[tile.rotation()%2], tile.drawx(), tile.drawy());
  },
  drawRequestRegion(req, list){
    var reg=this.rotateRegion[req.rotation%2];
    Draw.rect(reg, req.drawx(), req.drawy(), reg.getWidth() * req.animScale * Draw.scl, reg.getHeight() * req.animScale * Draw.scl, 0);
  },
  load(){
    this.super$load();
    this.rotateRegion=[];
    for(var i=0;i<2;i++){
      this.rotateRegion.push(Core.atlas.find(this.name+"-"+i));
    }
  },
  canPlaceOn(tile){
    for(var i=0;i<4;i++){
      if(tile.getNearby(i).block().name == "trains-rail" && tile.getNearby(i).rotation()%2 != i%2) return false;
    }
    return true;
		//return (tile.getNearby((tile.rotation()+1)%4).block().name != "trains-rail") && (tile.getNearby((tile.rotation()+3)%4).block().name != "trains-rail");
	}
});
