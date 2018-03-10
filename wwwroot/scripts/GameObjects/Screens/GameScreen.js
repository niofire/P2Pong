//Screen where the player plays a p2p or single player pong game.
function GameScreen(){
}

GameScreen.prototype.Cleanup = function(){

}

GameScreen.prototype.Setup = function(){
    var center = __windowContext.GetScreenCenter();
    var offset = 50;
    var ball = new Ball(center[0], center[1]);
    var player1 = new Paddle(offset , center[1], __gameState.Player1.Name);
    var player2 = new Paddle(0 , center[1], __gameState.Player2.Name)


    //Initialize the player2's starting position to the right of the screen
    player2.x = __windowContext.Canvas.width - offset - player2.size[0];

    __gameEngine.AddGameObject(player1);
    __gameEngine.AddGameObject(player2);
    __gameEngine.AddGameObject(ball);
}

GameScreen.prototype.Update = function(delta){

}