
window.onload = function(){

    //var gameInstance = new GameInstance(document.getElementById("GameCanvas"));

    //Start game, boot up intro screen
    
    var gameState = new GameState();
    gameState.Player1.Name = "Player1";
    gameState.Player2.Name = "Player2";

    this._screenManager = new ScreenManager();
    this._renderContext = new RenderContext(document.getElementById("GameCanvas"));
    //Start the intro screen
    this._screenManager.ChangeScreens(new IntroScreen(this._screenManager, this._renderContext, gameState));

    //
    //Start network node.
    //Start game node
    

}