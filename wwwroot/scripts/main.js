
window.onload = function(){

    var renderContext = new RenderContext(document.getElementById("GameCanvas"));
    var gameEngine = new GameEngine(renderContext);
    var offset = 50;
    var player1 = new Paddle(offset,10,"Player1");


    var player2 = new Paddle(0,10,"Player2");
    
    player2.x = renderContext.canvas.width - offset - player2.size[0];
    gameEngine.AddGameObject(player1);
    gameEngine.AddGameObject(player2);
}