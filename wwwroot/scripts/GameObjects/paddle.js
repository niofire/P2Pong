
function Paddle(x,y,name){
    this.x = x;
    this.y = y;
    this.name = name;
    this.speed = 3;
    this.Size = [10,50];
    this.IsActive = true;
    this.upperLimit = __windowContext.GetHeightPercent(0.2);
    this._movementStrategies = [this._onePlayerMovement, this._twoPlayerLocalMovement, this._twoPlayerOnlineMovement];
    this._movementDirection = "none";
    this.BallSpeedBoost = 0.5;
    this.AngleBoost = 10;

    this._hitCooldown = 0;
}

Paddle.prototype.Update = function(delta, gameState){
       
    this._hitCooldown -= delta;
    this._movementDirection = "none";
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

    if(CheckRectCollision(this, ball) && this._hitCooldown < 0){
        //Flip the ball's direction!
        
        //Paddle won't be able to hit the ball for 200 ms
        this._hitCooldown = 200;
        ball.Direction[0] *= -1;

        var oldX = ball.Direction[0];

        //Play boop sound effect.
        var snd = new Audio("assets/sound/paddleBoop.wav"); // buffers automatically when created
        snd.play();

        //Add/remove deg, up to max of 70 deg
        var pCenter = this.y + this.Size[1] / 2;
        var bCenter = ball.y + ball.Size[1] / 2;
        var distanceRatio = (pCenter - bCenter) / (this.Size[1] * 0.5);
        var angleBoost = DegToRad(this.AngleBoost  * distanceRatio);
        
        var angle = Math.atan2(ball.Direction[1], ball.Direction[0]);
        
        if(ball.Direction[0] > 0)
            angleBoost *= -1;

        angle += angleBoost;
        
        ball.Direction = [Math.cos(angle), Math.sin(angle)];
        
        //Add speed boost
        if(this._movementDirection == "up" && ball.Direction[1] < 0 
        || this._movementDirection == "down" && ball.Direction[1] > 0)
        {
            ball.SetSpeed(ball.speed += this.BallSpeedBoost);
        }
        else if(this._movementDirection == "up" && ball.Direction[1] > 0 
             || this._movementDirection == "down" && ball.Direction[1] < 0){
            ball.SetSpeed(ball.speed -= this.BallSpeedBoost);            
        }
    }
}

Paddle.prototype._onePlayerMovement = function(paddle, delta){
    if(paddle.name != "Player1")
        return;

    if(__inputManager.keysDown[87] || __inputManager.keysDown[38]){
        paddle._movementDirection = "up";
        paddle.y -= paddle.speed * 0.06 * delta;
    }
    if(__inputManager.keysDown[83] ||  __inputManager.keysDown[40]){
        paddle._movementDirection = "down";
        paddle.y += paddle.speed * 0.06 * delta;
    }
}

Paddle.prototype._twoPlayerLocalMovement = function(paddle, delta){

    let keys = paddle.name == "Player2" ? [38,40] : [87,83]

    if(__inputManager.keysDown[keys[0]]){
        paddle._movementDirection = "up";        
        paddle.y -= paddle.speed * 0.06 * delta;
    }
    if(__inputManager.keysDown[keys[1]]){
        paddle._movementDirection = "down";
        paddle.y += paddle.speed * 0.06 * delta;
    }
}

Paddle.prototype._twoPlayerOnlineMovement = function(paddle, delta){
    this._onePlayerMovement(paddle,delta);
}
