function ComputerPlayer(aiPaddle, ball) {
    this._paddle = aiPaddle;
    this._ball = ball;

    this.DetectionLimit = 0.5;
    this._randomState = 0;
    this._randomStateResetCounter = 1000;
    this._stabilizingOffset = 1;
}

ComputerPlayer.prototype.Render = function (ctx) {

}

ComputerPlayer.prototype.Update = function (delta) {

    //Update random state
    this._randomStateResetCounter -= delta;
    if (this._randomStateResetCounter < 0) {
        this._randomState = this._generateRandomState();
    }
    //AI is always on the right.

    var detectionLimit = __windowContext.GetHeightPercent(this.DetectionLimit);

    if (ball.x < detectionLimit)
        return;

    //Move slowly where the ball is 

    let targetPosition = this._paddle.y + _randomState;
    if(targetPosition < this._ball.y + this._stabilizingOffset
    && targetPosition > this._ball.y - this._stabilizingOffset){
        this._paddle.y = targetPosition;
    }
    else if (targetPosition < this._ball.y) {
        paddle.Move("up");
    }
    else{
        paddle.Move("down");
    }
}

ComputerPlayer.prototype._generateRandomState = function () {
    return (Math.random() - 0.5) * this._paddle.Size[1];

}