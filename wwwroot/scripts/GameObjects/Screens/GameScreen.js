//Screen where the player plays a p2p or single player pong game.
function GameScreen(){
    this.IsActive = true;
}

GameScreen.prototype.Cleanup = function(){

}

GameScreen.prototype.Setup = function(){
    var center = __windowContext.GetScreenCenter();
    
    //UI
    this.p1ScoreBoard = new TextElement("0", __windowContext.GetWidthPercent(0.25), __windowContext.GetHeightPercent(0.1));
    this.p2ScoreBoard = new TextElement("0", __windowContext.GetWidthPercent(0.75), __windowContext.GetHeightPercent(0.1));

    var lineBreak = new LineBreak([0                                   , __windowContext.GetHeightPercent(0.2)], 
                                  [__windowContext.GetWidthPercent(100), __windowContext.GetHeightPercent(0.2)]);

    var offset = 50;
    this.ball = new Ball(center[0], center[1]);
    
    this.player1 = new Paddle(offset, center[1], __gameState.Player1.Name);
    this.player2 = new Paddle(__windowContext.Canvas.width - offset, center[1], __gameState.Player2.Name)
    this.player2.x -= this.player2.Size[0];

    __gameEngine.AddGameObject(this.p1ScoreBoard);
    __gameEngine.AddGameObject(this.p2ScoreBoard);
    //__gameEngine.AddGameObject(lineBreak);
    __gameEngine.AddGameObject(this.player1);
    __gameEngine.AddGameObject(this.player2);
    __gameEngine.AddGameObject(this.ball);
}

GameScreen.prototype.Update = function(delta){
    this.player1.CheckBallCollision(this.ball);
    this.player2.CheckBallCollision(this.ball);
        
    //Check if scored
    if(this.ball.x < 0 - this.ball.Size[0]){
        this.p2ScoreBoard.Text++;
        this.ball.ResetState(1);
    }
    else if(this.ball.x > __windowContext.Canvas.width){
        this.p1ScoreBoard.Text++;
        this.ball.ResetState(-1);
    }
}