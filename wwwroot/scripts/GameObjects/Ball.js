function Ball(x, y) {

    //Defaults
    this.DefaultPosition = [x, y];
    this.DefaultSpeed = 3;

    //Fields
    this.x = x;
    this.y = y;
    this.speed = this.DefaultSpeed;
    this.Size = [10, 10];
    this.IsActive = true;
    this.Direction = [-1, 0];
    this.LaunchAmplitude = 70;
    this.MaxSpeed = 7.5;
    this.MinSpeed = 2.0;

    this.LockAngle = 20;
    this._lockRads = this.LockAngle * Math.PI / 180;
    //used to prevent the ball getting stuck on the arena's border.
    this._hitCooldown = 0;

    this.IsPaused = false;
    this.ArenaUpperBound = 0.2;
}

Ball.prototype.Update = function (delta, gameState) {

    if (this.IsPaused)
        return;
    this.x += this.Direction[0] * this.speed * 0.06 * delta;
    this.y += this.Direction[1] * this.speed * 0.06 * delta;

    this._hitCooldown -= delta;
    //Bounce back ball if out of bound
    if ((this.y >= __windowContext.Canvas.height - this.Size[1]
        || this.y <= 0 + __windowContext.GetHeightPercent(this.ArenaUpperBound))
        && this._hitCooldown < 0) {
        this._hitCooldown = 200;
        this.Direction[1] *= -1;
    }

}

Ball.prototype.GenerateRandomAngle = function () {
    var rads = DegToRad(Math.random() * this.LaunchAmplitude - this.LaunchAmplitude / 2);
    return [Math.abs(Math.cos(rads)), Math.sin(rads)];
}

Ball.prototype.Render = function (context) {
    context.beginPath();
    context.fillStyle = "#FFFFFF";
    context.fillRect(this.x, this.y, this.Size[0], this.Size[1]);
}

Ball.prototype.Launch = function (dir) {
    this.x = this.DefaultPosition[0];
    this.y = this.DefaultPosition[1];
    this.speed = this.DefaultSpeed;

    this.Direction = this.GenerateRandomAngle();
    this.Direction[0] *= dir;
}

Ball.prototype.SetSpeed = function (speed) {
    this.speed = speed;
    this.speed = Math.min(this.speed, this.MaxSpeed);
    this.speed = Math.max(this.speed, this.MinSpeed);
}

Ball.prototype.SetAngleInRads = function (rads) {

    rads = rads % Math.PI;

    if (Math.abs(Math.PI / 2 - Math.abs(rads)) < this._lockRads)
        return;

    this.Direction = [Math.cos(rads), Math.sin(rads)];
}

Ball.prototype.AddRads = function (rads) {
    var angle = Math.atan2(this.Direction[1], this.Direction[0]);

    if (this.Direction[0] > 0)
        rads *= -1;

    this.SetAngleInRads(angle + rads);
}