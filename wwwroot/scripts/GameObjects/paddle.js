
function Paddle(x,y,name){
    this.x = x;
    this.y = y;
    this.name = name;
    this.speed = 3;
    this.size = [10,50];
    this.isActive = true;

    this.upperLimit = 0;
}

Paddle.prototype.Update = function(delta, gameState){
    if(this.name != "Player1")
        return;
        
    if(inputManager.keysDown[87])
        this.y -= this.speed * 0.06 * delta;
    if(inputManager.keysDown[83])
        this.y += this.speed * 0.06 * delta;

    //Check if out of bound
    if(this.y < this.upperLimit)
        this.y = this.upperLimit;
    else
        this.y = Math.min(this.y, gameState.renderContext.canvas.height - this.size[1]);
}

Paddle.prototype.Render = function(context){
    context.beginPath();
    context.fillStyle = "#FFFFFF";
    context.fillRect(this.x,this.y,this.size[0],this.size[1]);
}