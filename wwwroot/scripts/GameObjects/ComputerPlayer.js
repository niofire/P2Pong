function ComputerPlayer(aiPaddle, ball) {
    this._paddle = aiPaddle;
    this._ball = ball;

    this.DetectionLimit = 0.55;
    this._randomState = 0;
    this._stabilizingOffset = 1;
    this.IsActive = true;
    this._paddle.speed = 2;
    var self = this;
    this.StopTimer = 0;
    this._paddle.OnBallHit = function(){
        self._randomState = self._generateRandomState();
        self.StopTimer = 1500;
    }
}

ComputerPlayer.prototype.Render = function (ctx) {

}

ComputerPlayer.prototype.Update = function (delta) {

    //Update random state
    this.StopTimer -= delta;
    //AI is always on the right.
    if(this.StopTimer > 0)
        return;
    var detectionLimit = __windowContext.GetHeightPercent(this.DetectionLimit);

    if (this._ball.x < detectionLimit)
        return;
    
    //Move slowly where the ball is 
    let targetPosition = this._ball.y - this._paddle.Size[1] / 2 + this._randomState;
    if(targetPosition < this._paddle.y + this._stabilizingOffset
    && targetPosition > this._paddle.y - this._stabilizingOffset){
        this._paddle.y = targetPosition;
    }
    else if (targetPosition < this._paddle.y) {
        this._paddle.Move(delta,"up");
    }
    else{
        this._paddle.Move(delta,"down");
    }
}

ComputerPlayer.prototype._generateRandomState = function () {
    return (Math.random() - 0.5) * this._paddle.Size[1];
}