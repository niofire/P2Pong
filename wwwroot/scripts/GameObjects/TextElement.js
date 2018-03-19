function TextElement(content, x, y){
    this.x = x;
    this.y = y;
    this.Text = content;
    this.IsActive = true;
    this.Alignment = "center";
}

TextElement.prototype.Render = function(context){
    context.beginPath();
    if(this.Alignment)
        context.textAlign = this.Alignment;
    if(!this.Size)
        this.Size = 30;

    context.font = this.Size + 'px "Press Start 2P"';

    if(!this.color)
        this.color = "#FFFFFF";
    context.fillStyle = this.color;
    context.fillText(this.Text, this.x, this.y);
}

TextElement.prototype.Update = function(delta, gameState){
    if(this.Effect)
        this.Effect(delta, gameState);
}