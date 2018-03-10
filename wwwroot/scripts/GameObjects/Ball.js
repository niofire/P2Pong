function Ball(x,y){

    this.defaultPosition = [x, y];
    this.x               = x;
    this.y               = y;
    this.speed           = 2;
    this.size            = 10;
    this.IsActive        = true;
    this.direction       = [-1,0];
}

Ball.prototype.Update = function(delta, gameState){
    this.x += this.direction[0] * this.speed * 0.06 * delta;
    this.y += this.direction[1] * this.speed * 0.06 * delta;

    //Check if scored
    if(this.x < 0 - this.size){
        this.ResetState(1);
    }
    else if(this.x > __windowContext.Canvas.width){
        this.ResetState(-1);
    }
}

Ball.prototype.GenerateAngle = function(){

    //50 degree arc
    var angle = Math.random() * 50 + 20;

    return [Math.abs(Math.cos(angle)), Math.sin(angle)];
}

Ball.prototype.Render = function(context){
    context.beginPath();
    context.fillStyle = "#FFFFFF";
    context.fillRect(this.x,this.y,this.size,this.size);
}

Ball.prototype.ResetState = function(dir){
    this.x = this.defaultPosition[0];
    this.y = this.defaultPosition[1];

    this.direction = this.GenerateAngle();
    this.direction[0] *= dir;
}