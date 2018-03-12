function LineBreak(x,y, size){
    this.x     = x;
    this.y     = y;
    this.Size  = size;
    this.Color = "#FFFFFF";
}


LineBreak.prototype.Render = function(ctx){
    /*ctx.BeginDraw();
    ctx.DrawLine(x, y);*/
}

LineBreak.prototype.Update = function(delta){
    //do nothing
}