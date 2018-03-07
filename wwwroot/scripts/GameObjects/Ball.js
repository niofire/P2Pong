function Ball(x,y){

    this.defaultPosition = [x, y];
    this.x = x;
    this.y = y;
    this.speed = 2;
    this.size = 10;
    this.isActive = true;
    this.direction = [-1,0];
}

Ball.prototype.ResetPosition = function(){
    this.x = this.defaultPosition[0];
    this.y = this.defaultPosition[1];
}

Ball.prototype.Update = function(delta, gameState){
    this.x += this.direction[0] * this.speed * 0.06 * delta;
    this.y += this.direction[1] * this.speed * 0.06 * delta;

    //Check if scored
    if(this.x < 0 - this.size){
        console.log("A");
        this.ResetPosition();
        this.direction = [1,0];
    }
    else if(this.x > gameState.renderContext.canvas.width){
        console.log("B");
        this.ResetPosition();
        this.direction = [-1,0];
    }
}

Ball.prototype.Render = function(context){
    context.beginPath();
    context.fillStyle = "#FFFFFF";
    context.fillRect(this.x,this.y,this.size,this.size);
}