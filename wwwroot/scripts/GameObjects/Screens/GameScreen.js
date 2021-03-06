//Screen where the player plays a p2p or single player pong game.
function GameScreen() {
    this.IsActive = true;
    this.MaxScore = 3;
}

GameScreen.prototype.Cleanup = function () {
    __gameEngine.Clear();
}

GameScreen.prototype.Setup = function () {
    var center = __windowContext.GetScreenCenter();

    //UI
    this.p1ScoreBoard = new TextElement("0", __windowContext.GetWidthPercent(0.1), __windowContext.GetHeightPercent(0.13));
    this.p2ScoreBoard = new TextElement("0", __windowContext.GetWidthPercent(0.9), __windowContext.GetHeightPercent(0.13));
    this._scoreCountdown = new GameCountdown();
    var lineBreak = new LineBreak([0, __windowContext.GetHeightPercent(0.2)],
        [__windowContext.GetWidthPercent(100), __windowContext.GetHeightPercent(0.2)],
        3);
    var fieldDivider = new LineBreak([__windowContext.GetWidthPercent(0.5), __windowContext.GetHeightPercent(0.2)],
        [__windowContext.GetWidthPercent(0.5), __windowContext.GetHeightPercent(1)],
        3);
    fieldDivider.LineDash = [10, 8];
    
    //Game objects
    var offset = 50;
    this.ball = new Ball(center[0], center[1]);
    this.player1 = new Paddle(offset, center[1], __gameState.Player1.Name);
    this.player2 = new Paddle(__windowContext.Canvas.width - offset, center[1], __gameState.Player2.Name)
    this.player2.x -= this.player2.Size[0];

    __gameEngine.AddGameObject(this.p1ScoreBoard);
    __gameEngine.AddGameObject(this.p2ScoreBoard);
    __gameEngine.AddGameObject(new TitleLabel());
    __gameEngine.AddGameObject(this._scoreCountdown);
    __gameEngine.AddGameObject(lineBreak);
    __gameEngine.AddGameObject(fieldDivider);
    __gameEngine.AddGameObject(this.player1);
    __gameEngine.AddGameObject(this.player2);
    __gameEngine.AddGameObject(this.ball);

    if (__gameState.Mode == GameMode.ONE_PLAYER) {
        this._computerPlayer = new ComputerPlayer(this.player2, this.ball)
        __gameEngine.AddGameObject(this._computerPlayer);
    }

    this._scoreCountdown.StartCountdown(3);
}

GameScreen.prototype.Update = function (delta) {

    //Check for paddle/ball collision
    this.player1.CheckBallCollision(this.ball);
    this.player2.CheckBallCollision(this.ball);
    //Check if scored
    if (this.ball.x < 0 - this.ball.Size[0]) {
        this.player1.Reset();
        this.player2.Reset();
        this.p2ScoreBoard.Text++;
        this.ball.Launch(1);
        this._scoreCountdown.StartCountdown(3);
        if (this.p2ScoreBoard.Text >= this.MaxScore)
            this._EndGame(__gameState.Player2);
    }
    else if (this.ball.x > __windowContext.Canvas.width) {
        this.player1.Reset();
        this.player2.Reset();
        this.p1ScoreBoard.Text++;
        this.ball.Launch(-1);
        this._scoreCountdown.StartCountdown(3);
        if (this.p1ScoreBoard.Text >= this.MaxScore)
            this._EndGame(__gameState.Player1);
    }

    if (__inputManager.keysDown[27])
        __screenManager.ChangeScreen(new PlayerSelectMenu());
}



GameScreen.prototype._EndGame = function (player) {
    __gameState.Winner = player;
    __screenManager.ChangeScreen(new GameOverScreen());
}