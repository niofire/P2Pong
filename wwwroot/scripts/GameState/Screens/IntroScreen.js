//Intro screen of the game where player can start game & get p2p invite code
function IntroScreen(screenManager, renderContext, gameState){
    this._gameEngine = new GameEngine(renderContext);
}

IntroScreen.prototype.Cleanup = function(){

}

IntroScreen.prototype.Setup = function(){
    this._gameEngine.AddGameObject(new TextElement("Hello,World!", 100,100));
}

IntroScreen.prototype.Play = function(){

}

IntroScreen.prototype.Stop = function(){

}