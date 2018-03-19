function GameCountdown() {
    this.IsActive = true;
    this.MillisPerTick = 500;

    this._countdownText = new TextElement("3", __windowContext.GetWidthPercent(0.5), __windowContext.GetHeightPercent(0.6));
    this._countdownText.Size = 60;

    __gameEngine.AddGameObject(this._countdownText);
    this._timer = 0;
}

GameCountdown.prototype.Update = function (delta) {

    this._timer -= delta;
    this._countdownText.Text = Math.floor(this._timer / this.MillisPerTick) + 1;
    if (this._timer < 0) {
        this.IsActive = false;
        this._countdownText.IsActive = false;
        __gameEngine.Resume();
    }

}

GameCountdown.prototype.Render = function (ctx) {
}

GameCountdown.prototype.StartCountdown = function (ticks) {
    __gameEngine.Pause();

    this._countdownText.Text = ticks;
    this.IsActive = true;
    this._countdownText.IsActive = true;
    this.IsPaused = false;
    this._countdownText.IsPaused = false;
    this._timer = ticks * this.MillisPerTick;
}