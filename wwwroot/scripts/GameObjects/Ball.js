function Ball(x,y){

    this.defaultPosition = [x, y];
    this.x               = x;
    this.y               = y;
    this.speed           = 2;
    this.Size            = [10,10];
    this.IsActive        = true;
    this.Direction       = [-1,0];
    this.LaunchAmplitude = 70;
}

Ball.prototype.Update = function(delta, gameState){
    this.x += this.Direction[0] * this.speed * 0.06 * delta;
    this.y += this.Direction[1] * this.speed * 0.06 * delta;
    
    //Bounce back ball if out of bound
    if(this.y >= __windowContext.Canvas.height - this.Size[1] 
    || this.y <= 0 + __windowContext.GetHeightPercent(0.2))
        this.Direction[1] *= -1;
    
}

Ball.prototype.GenerateAngle = function(){

    //50 degree arc
    var rads = DegToRad(Math.random() * this.LaunchAmplitude - this.LaunchAmplitude/2 );

    return [Math.abs(Math.cos(rads)), Math.sin(rads)];
}

Ball.prototype.Render = function(context){
    context.beginPath();
    context.fillStyle = "#FFFFFF";
    context.fillRect(this.x,this.y,this.Size[0],this.Size[1]);
}

Ball.prototype.ResetState = function(dir){
    this.x = this.defaultPosition[0];
    this.y = this.defaultPosition[1];

    this.Direction = this.GenerateAngle();
    console.log(this.Direction);
    this.Direction[0] *= dir;
}