
function Paddle(x,y,name){
    this.x = x;
    this.y = y;
    this.name = name;
    this.speed = 3;
    this.Size = [10,50];
    this.IsActive = true;
    this.upperLimit = __windowContext.GetHeightPercent(0.2);
    this._movementStrategies = [this._onePlayerMovement, this._twoPlayerLocalMovement, this._twoPlayerOnlineMovement];
}

Paddle.prototype.Update = function(delta, gameState){
       
    this._movementStrategies[__gameState.Mode](this, delta);

    //Check if out of bound
    if(this.y < this.upperLimit)
        this.y = this.upperLimit;
    else
        this.y = Math.min(this.y, __windowContext.Canvas.height - this.Size[1]);
}

Paddle.prototype.Render = function(context){
    context.beginPath();
    context.fillStyle = "#FFFFFF";
    context.fillRect(this.x,this.y,this.Size[0],this.Size[1]);
}

Paddle.prototype.CheckBallCollision = function(ball){

    if(CheckRectCollision(this, ball)){
        var pCenter = this.y + this.Size[1] / 2;
        var bCenter = ball.y + ball.Size[1] / 2;
        var snd = new Audio("assets/sound/paddleBoop.wav"); // buffers automatically when created
        snd.play();
        //Add/remove deg, up to max of 70 deg
        
        ball.Direction[0] *= -1;
    }
}

Paddle.prototype._onePlayerMovement = function(paddle, delta){
    if(paddle.name != "Player1")
        return;

    if(__inputManager.keysDown[87] || __inputManager.keysDown[38])
        paddle.y -= paddle.speed * 0.06 * delta;
    if(__inputManager.keysDown[83] ||  __inputManager.keysDown[40])
        paddle.y += paddle.speed * 0.06 * delta;
}

Paddle.prototype._twoPlayerLocalMovement = function(paddle, delta){

    let up = 87
    let down = 83;
    if(paddle.name == "Player2")
    {
        up = 38;
        down = 40;
    }
    if(__inputManager.keysDown[up])
        paddle.y -= paddle.speed * 0.06 * delta;
    if(__inputManager.keysDown[down])
        paddle.y += paddle.speed * 0.06 * delta;
}

Paddle.prototype._twoPlayerOnlineMovement = function(paddle, delta){
    if(__inputManager.keysDown[87] || __inputManager.keysDown[38])
        paddle.y -= paddle.speed * 0.06 * delta;
    if(__inputManager.keysDown[83] ||  __inputManager.keysDown[40])
        paddle.y += paddle.speed * 0.06 * delta;
}
