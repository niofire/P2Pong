
function Paddle(x, y, name) {
    this.x = x;
    this.y = y;
    this.name = name;
    this.speed = 3;
    this.Size = [10, 50];
    this.IsActive = true;
    this.upperLimit = __windowContext.GetHeightPercent(0.2);
    this._movementStrategies = [this._onePlayerMovement, this._twoPlayerLocalMovement, this._twoPlayerOnlineMovement];
    this._movementDirection = "none";
    this.BallSpeedBoost = 0.7;
    this.AngleBoost = 20;

    this._hitCooldown = 0;
    this.IsPaused = false;
}

Paddle.prototype.Update = function (delta, gameState) {

    if (this.IsPaused)
        return;

    this._hitCooldown -= delta;
    this._movementDirection = "none";
    this._movementStrategies[__gameState.Mode](this, delta);

    //Check if out of bound
    if (this.y < this.upperLimit)
        this.y = this.upperLimit;
    else
        this.y = Math.min(this.y, __windowContext.Canvas.height - this.Size[1]);
}

Paddle.prototype.Render = function (context) {
    context.beginPath();
    context.fillStyle = "#FFFFFF";
    context.fillRect(this.x, this.y, this.Size[0], this.Size[1]);
}

Paddle.prototype.Move = function (delta, direction) {

    if (direction == "up") {
        this._movementDirection = "up";
        this.y -= this.speed * 0.06 * delta;
        return;
    }
    this._movementDirection = "down";
    this.y += this.speed * 0.06 * delta;
}

Paddle.prototype.Reset = function(){
    this.y = __windowContext.GetHeightPercent(0.5);
}

Paddle.prototype.CheckBallCollision = function (ball) {

    if (!CheckRectCollision(this, ball) || this._hitCooldown > 0)
        return;
    
        //Paddle won't be able to hit the ball for 200 ms
    this._hitCooldown = 200;

    //Execute paddle's OnBallHit callback!
    if (this.OnBallHit)
        this.OnBallHit();

    //Reverse ball direction!
    ball.Direction[0] *= -1;

    //Play boop sound effect.
    __soundController.PlaySound(__soundAssets.OnPaddleHit);

    this._updateBallAngle(ball);
    this._updateBallSpeed(ball);
}

Paddle.prototype._onePlayerMovement = function (paddle, delta) {

    if (paddle.name != "Player1")
        return;

    if (__inputManager.keysDown[87] || __inputManager.keysDown[38]) {
        paddle.Move(delta, "up");
    }

    if (__inputManager.keysDown[83] || __inputManager.keysDown[40])
        paddle.Move(delta, "down");
}

Paddle.prototype._twoPlayerLocalMovement = function (paddle, delta) {

    let keys = paddle.name == "Player2" ? [38, 40] : [87, 83]

    if (__inputManager.keysDown[keys[0]])
        paddle.Move(delta, "up");

    if (__inputManager.keysDown[keys[1]])
        paddle.Move(delta, "down");
}

Paddle.prototype._twoPlayerOnlineMovement = function (paddle, delta) {
    paddle._onePlayerMovement(paddle, delta);
}

Paddle.prototype._updateBallSpeed = function (ball) {

    if (this._movementDirection == "up" && ball.Direction[1] < 0
        || this._movementDirection == "down" && ball.Direction[1] > 0) {
        ball.SetSpeed(ball.speed += this.BallSpeedBoost);
    }
    else if (this._movementDirection == "up" && ball.Direction[1] > 0
        || this._movementDirection == "down" && ball.Direction[1] < 0) {
        ball.SetSpeed(ball.speed -= this.BallSpeedBoost * 0.5);
    }
}

Paddle.prototype._updateBallAngle = function (ball) {

    //Add/remove deg, up to max of 70 deg
    var pCenter = this.y + this.Size[1] / 2;
    var bCenter = ball.y + ball.Size[1] / 2;
    var distanceRatio = (pCenter - bCenter) / (this.Size[1] * 0.5);
    var angleBoost = DegToRad(this.AngleBoost * distanceRatio);

    ball.AddRads(angleBoost);
}