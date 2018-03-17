function LineBreak(a, b, size) {
    this.a = a;
    this.b = b;
    this.Size = size;
    this.Color = "#FFFFFF";
    this.IsActive = true;
}


LineBreak.prototype.Render = function (ctx) {
    ctx.beginPath();
    ctx.moveTo(this.a[0], this.a[1]);
    ctx.lineTo(this.b[0], this.b[1]);
    ctx.strokeStyle = this.Color;
    ctx.lineWidth = this.Size;
    if(this.LineDash)
        ctx.setLineDash(this.LineDash);
    else
        ctx.setLineDash([1,0]);
    ctx.stroke();
}

LineBreak.prototype.Update = function (delta) {
    //do nothing
}