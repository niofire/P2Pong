function StartMenu() {
    this.IsActive = true;
}


StartMenu.prototype.Setup = function () {

    var screenCenter = __windowContext.GetScreenCenter();

    var paddle1 = new Paddle
    //Title Label
    __gameEngine.AddGameObject(new TitleLabel());

    //Start game label
    var startGameLabel = new TextElement("START GAME", screenCenter[0], screenCenter[1] + 50);
    startGameLabel.Alignment = "center";
    startGameLabel.Size = 22;
    var black = "#000000";
    var white = "#FFFFFF";
    var time = 0;
    var blinkRate = [600, 350];
    this.color = "#FFFFFF";

    startGameLabel.Effect = function (delta, gameState) {
        time += delta;
        if (this.color == white && time > blinkRate[0]) {
            time = 0;
            this.color = black;
        }
        else if (this.color == black && time > blinkRate[1]) {
            time = 0;
            this.color = white;
        }
    }

    //Background Simulation
    var offset = 50;
    var center = __windowContext.GetScreenCenter();
    
    this.ball = new Ball(center[0], center[1]);
    this.ball.ArenaUpperBound = 0;
    this.ball.MaxSpeed = 4;
    this.ball.Launch(-1);

    this.player1 = new Paddle(offset, center[1], __gameState.Player1.Name);
    this._InitializePaddle(this.player1);
    
    this.player2 = new Paddle(__windowContext.Canvas.width - offset, center[1], __gameState.Player2.Name)
    this.player2.x -= this.player2.Size[0];
    this._InitializePaddle(this.player2);
    
    var comp1  =new ComputerPlayer(this.player1, this.ball);
    comp1.DetectionLimit = 0;
    
    var comp2  =new ComputerPlayer(this.player2, this.ball);
    comp2.DetectionLimit = 0;
    

    __gameEngine.AddGameObject(this.player1);
    __gameEngine.AddGameObject(comp1);
    __gameEngine.AddGameObject(this.player2);
    __gameEngine.AddGameObject(comp2);
    __gameEngine.AddGameObject(this.ball);
    __gameEngine.AddGameObject(startGameLabel);
}

StartMenu.prototype.Cleanup = function () {
    __gameEngine.Clear();
}

StartMenu.prototype.Update = function (delta, gameState) {
    //if spacebar or enter-, goes to next screen
    if (__inputManager.keysDown[13] || __inputManager.keysDown[32]) {
        __soundController.PlaySound(__soundAssets.OnMenuNavigate);
        __screenManager.ChangeScreen(new PlayerSelectMenu());
    }

    //Check for paddle/ball collision
    this.player1.CheckBallCollision(this.ball);
    this.player2.CheckBallCollision(this.ball);

    if (this.ball.x < 0 - this.ball.Size[0] || this.ball.x > __windowContext.Canvas.width) 
        this.ball.Launch(-1);
}

StartMenu.prototype._InitializePaddle = function(paddle){
    paddle.speed = 4;
    paddle.ArenaUpperBound = 0;
}