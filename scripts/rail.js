const railname="trains-rail";
const rail = extendContent(Block, "rail", {
  draw(tile) {
    //Draw.rect(this.rotateRegion[tile.rotation()%2], tile.drawx(), tile.drawy());
    var res=this.connection(tile,tile.rotation());
    if(res[1]==-1) return;
    if(res[1]<8||res[1]==12) Draw.rect(this.conRegion[res[1]][res[0]], tile.drawx(), tile.drawy());
    if(res[1]==10||res[1]==9||res[1]==11) Draw.rect(this.conRegion[8][res[0]%2], tile.drawx(), tile.drawy());
    if(res[1]==9) Draw.rect(this.conRegion[3][res[0]], tile.drawx(), tile.drawy());
    if(res[1]==11) Draw.rect(this.conRegion[3][tile.rotation()], tile.drawx(), tile.drawy());
    if(res[1]==8||res[1]==10){
      Draw.rect(this.conRegion[3][res[0]], tile.drawx(), tile.drawy());
      Draw.rect(this.conRegion[3][(res[0]+3)%4], tile.drawx(), tile.drawy());
    }
    //Vars.ui.showLabel(res[1]+"-"+res[0],1,tile.worldx(),tile.worldy());
  },
  drawRequestRegion(req, list){
    var reg=this.rotateRegion[req.rotation%2];
    Draw.rect(reg, req.drawx(), req.drawy(), reg.getWidth() * req.animScale * Draw.scl, reg.getHeight() * req.animScale * Draw.scl, 0);
  },
  load(){
    this.super$load();
    this.rotateRegion=[];
    for(var i=0;i<2;i++){
      this.rotateRegion.push(Core.atlas.find(this.name+"-2-"+i));
    }
    this.conRegion=[];
    for(var i=0;i<13;i++){
      var tmparr=[];
      for(var j=0;j<4;j++){
        tmparr.push(Core.atlas.find(this.name+"-"+i+"-"+j));
      }
      this.conRegion.push(tmparr);
    }
  },
  /*
  canPlaceOn(tile){
    for(var i=0;i<4;i++){
      if(tile.getNearby(i).block().name == railname && tile.getNearby(i).rotation()%2 != i%2) return false;
    }
    return true;
		//return (tile.getNearby((tile.rotation()+1)%4).block().name != "trains-rail") && (tile.getNearby((tile.rotation()+3)%4).block().name != "trains-rail");
	},
  */
  connection(tile,rot){
    var connections=[];
    //var ret=[]; //rot, type
    for(var i=0;i<4;i++){
      if(tile.getNearby(i).block().name == railname) connections.push(i);
    }
    if(connections.length==0) return [rot%2,0];
    else if(connections.length==1){
      var other=tile.getNearby(connections[0]);
      if((other.getNearby(connections[0]%2+1).block().name == railname) || (other.getNearby((connections[0]%2+3)%4).block().name == railname)) return [0,-1];
      return [connections[0],1];
    }
    else if(connections.length==2){
      if((connections[0]+connections[1])%2==0){
        //line
        var other=tile.getNearby(connections[0]);
        if((other.getNearby(connections[0]%2+1).block().name == railname) || (other.getNearby((connections[0]%2+3)%4).block().name == railname)) return [0,-1];
        other=tile.getNearby(connections[1]);
        if((other.getNearby(connections[1]%2+1).block().name == railname) || (other.getNearby((connections[1]%2+3)%4).block().name == railname)) return [0,-1];
        return [connections[0]%2,2];
      }
      else{
        //curve
        if(connections[0]==0&&connections[1]==3){
          connections[0]=3;
          connections[1]=0;
        }
        var other1=tile.getNearby(connections[0]);
        var other2=tile.getNearby(connections[1]);

        if(other1.getNearby((connections[0]+1)%4).block().name == railname){
          //corner filled
          return [connections[0],4];
        }
        else if(other1.getNearby((connections[0]+3)%4).block().name == railname){
          if(other2.getNearby((connections[1]+1)%4).block().name == railname){
            //W
            return [connections[0],7];
          }
          else{
            //L+1
            return [connections[0],5];
          }
        }
        else{
          if(other2.getNearby((connections[1]+1)%4).block().name == railname){
            //L+0
            return [connections[0],6];
          }
          else{
            //C
            return [connections[0],3];
          }
        }
      }
    }
    else if(connections.length==3){
      return [(8-(connections[0]+connections[1]+connections[2]))%4,(rot-(8-(connections[0]+connections[1]+connections[2]))+8)%4+8];
    }
    else{
      return [0,12];
    }
  }
});
