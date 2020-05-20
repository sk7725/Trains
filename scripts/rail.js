const railname="trains-rail";
const rail = extendContent(Block, "rail", {
  draw(tile) {
    //Draw.rect(this.rotateRegion[tile.rotation()%2], tile.drawx(), tile.drawy());
    var res=this.connection(tile,tile.rotation());
    if(res[1]==-1) return;
    if(res[1]<8||res[1]==12||res[1]==14||res[1]==15) Draw.rect(this.conRegion[res[1]][res[0]], tile.drawx(), tile.drawy());
    if(res[1]==10||res[1]==9||res[1]==11) Draw.rect(this.conRegion[8][res[0]%2], tile.drawx(), tile.drawy());
    if(res[1]==9) Draw.rect(this.conRegion[13][res[0]], tile.drawx(), tile.drawy());
    if(res[1]==11) Draw.rect(this.conRegion[13][tile.rotation()], tile.drawx(), tile.drawy());
    if(res[1]==8||res[1]==10){
      Draw.rect(this.conRegion[13][res[0]], tile.drawx(), tile.drawy());
      Draw.rect(this.conRegion[13][(res[0]+3)%4], tile.drawx(), tile.drawy());
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
    for(var i=0;i<16;i++){
      var tmparr=[];
      for(var j=0;j<4;j++){
        tmparr.push(Core.atlas.find(this.name+"-"+i+"-"+j));
      }
      this.conRegion.push(tmparr);
    }
    this.rail=true;
  },
  /*
  canPlaceOn(tile){
    for(var i=0;i<4;i++){
      if(tile.getNearby(i).block().rail && tile.getNearby(i).rotation()%2 != i%2) return false;
    }
    return true;
		//return (tile.getNearby((tile.rotation()+1)%4).block().name != "trains-rail") && (tile.getNearby((tile.rotation()+3)%4).block().name != "trains-rail");
	},
  */
  connection(tile,rot){
    var connections=[];
    //var ret=[]; //rot, type
    for(var i=0;i<4;i++){
      if(tile.getNearby(i).block().rail) connections.push(i);
    }
    if(connections.length==0) return [rot%2,0];
    else if(connections.length==1){
      var other=tile.getNearby(connections[0]);
      if((other.getNearby(connections[0]%2+1).block().rail) || (other.getNearby((connections[0]%2+3)%4).block().rail)) return [0,-1];
      return [connections[0],1];
    }
    else if(connections.length==2){
      if((connections[0]+connections[1])%2==0){
        //line
        var other=tile.getNearby(connections[0]);
        var l1=other.getNearby(connections[0]%2+1).block().rail;
        var l2=other.getNearby((connections[0]%2+3)%4).block().rail;
        if(l1&&l2) return [0,-1];
        other=tile.getNearby(connections[1]);
        var l3=other.getNearby(connections[0]%2+1).block().rail;
        var l4=other.getNearby((connections[0]%2+3)%4).block().rail;
        if(l3&&l4) return [0,-1];
        else if((l1||l2)&&(l3||l4)){
          if(l1&&l3){
            //ㄹ
          }
          else if(l2&&l4){
            //ㄹ2
          }
          else{
            //ㄷ
          }
        }
        else if(l1||l3){
          //ㄱ
          if(l1) return [connections[0],14];
          return [connections[1],15];
        }
        else if(l2||l4){
          //ㄴ
          if(l2) return [connections[0],15];
          return [connections[1],14];
        }
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

        if(other1.getNearby((connections[0]+1)%4).block().rail){
          //corner filled
          return [connections[0],4];
        }
        else if(other1.getNearby((connections[0]+3)%4).block().rail){
          if(other2.getNearby((connections[1]+1)%4).block().rail){
            //W
            return [connections[0],7];
          }
          else{
            //L+1
            return [connections[0],5];
          }
        }
        else{
          if(other2.getNearby((connections[1]+1)%4).block().rail){
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
      //enable for directional rails
      //return [(8-(connections[0]+connections[1]+connections[2]))%4,(rot-(8-(connections[0]+connections[1]+connections[2]))+8)%4+8];
      //else do this
      return [(8-(connections[0]+connections[1]+connections[2]))%4,8];
    }
    else{
      return [0,12];
    }
  },
  rail:true
});
