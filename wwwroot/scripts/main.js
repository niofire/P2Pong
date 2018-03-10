
window.onload = function(){

    //var gameInstance = new GameInstance(document.getElementById("GameCanvas"));

    //Start game, boot up intro screen
    
    var gameState = new GameState();
    gameState.Player1.Name = "Player1";
    gameState.Player2.Name = "Player2";
    screenManager.ChangeScreen(new StartMenu());
    //
    //Start network node.
    //Start game node
    

}