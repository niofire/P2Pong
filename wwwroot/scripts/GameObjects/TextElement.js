function TextElement(content, x, y){
    this.x = x;
    this.y = y;
    this.Text = content;
    this.isActive = true;
}


TextElement.prototype.Render = function(context){
    console.log("Asdf");
    context.font = "30px Arial";
    context.fillStyle = "#FFFFFF";
    context.fillText(this.Text);
}

TextElement.prototype.Update = function(delta, gameState){
    //do nothing
}