function GameOverScreen(gameEngine){
    this._gameEngine = gameEngine;
    this.IsActive = true;

    this._timer = 500;
}

GameOverScreen.prototype.Update = function(delta, gameState){
    
    this._timer -= delta;
    if(this._timer > 0)
        return;
}

GameOverScreen.prototype.Setup = function(){
    
    //Add title
    __gameEngine.AddGameObject(new TitleLabel());
    __gameEngine.AddGameObject(new TextElement("Player 1 Wins!", __windowContext.GetWidthPercent(0.5), __windowContext.GetHeightPercent(0.5)));

    //If any key is pressed, go to start menu.
}

GameOverScreen.prototype.Cleanup = function(){
    __gameEngine.Clear();
}