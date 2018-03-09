//Screen where the player plays a p2p or single player pong game.
function GameScreen(screenManager, renderContext, gameState){

    this._gameState = gameState;
    this._renderContext = renderContext;
    this._gameEngine = new GameEngine(renderContext);
}

GameScreen.prototype.Cleanup = function(){

}

GameScreen.prototype.Setup = function(){

    var offset = 50;
    var ball = new Ball(this._renderContext.canvas.width / 2, 100);
    var player1 = new Paddle(offset,10,this._gameState.Player1.Name);
    var player2 = new Paddle(0,10,this._gameState.Player2.Name)


    //Initialize the player2's starting position to the right of the screen
    player2.x = this._renderContext.canvas.width - offset - player2.size[0];

    this._gameEngine.AddGameObject(player1);
    this._gameEngine.AddGameObject(player2);
    this._gameEngine.AddGameObject(ball);
}

GameScreen.prototype.Play = function(){

}

GameScreen.prototype.Stop = function(){

}