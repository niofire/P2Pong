
window.onload = function(){
    var gameEngine = engine();

    var player1 = paddle();
    var player2 = paddle();

    gameEngine.addGameObject(player1);
    gameEngine.addGameObject(player2);
}

