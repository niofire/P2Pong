function PlayerSelectMenu(gameEngine){
    this._gameEngine = gameEngine;
    this.IsActive = true;
}

PlayerSelectMenu.prototype.Update = function(delta, gameState){

}

PlayerSelectMenu.prototype.Setup = function(){
    
    //Add title
    __gameEngine.AddGameObject(new TitleLabel());

    var selector = new OptionsSelector();
    selector.AddOption("1 PLAYER", function(){
        __gameState.Mode = GameMode.ONE_PLAYER;
        __screenManager.ChangeScreen(new GameScreen());
    })

    selector.AddOption("2 PLAYER", function(){
        __screenManager.ChangeScreen(new MutliplayerOptionMenu());
    })

    var muteDisclaimer = new MuteDisclaimer();
    __gameEngine.AddGameObject(muteDisclaimer);

    __gameEngine.AddGameObject(selector);
}

PlayerSelectMenu.prototype.Cleanup = function(){
    __gameEngine.Clear();
}