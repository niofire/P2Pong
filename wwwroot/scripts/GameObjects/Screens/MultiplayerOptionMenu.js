function MutliplayerOptionMenu(gameEngine){
    this._gameEngine = gameEngine;
    this.IsActive = true;
}

MutliplayerOptionMenu.prototype.Update = function(delta, gameState){

}

MutliplayerOptionMenu.prototype.Setup = function(){
    
    //Add title
    __gameEngine.AddGameObject(new TitleLabel());

    var selector = new OptionsSelector();
    selector.AddOption("LOCAL", function(){
        __gameState.Mode = GameMode.TWO_PLAYERS_LOCAL;
        __screenManager.ChangeScreen(new GameScreen());
    })

    selector.AddOption("ONLINE", function(){
        __gameState.Mode = GameMode.TWO_PLAYERS_ONLINE;
        __screenManager.ChangeScreen(new P2PSelectMenu());
    })

    var muteDisclaimer = new MuteDisclaimer();
    __gameEngine.AddGameObject(muteDisclaimer);

    __gameEngine.AddGameObject(selector);
    __gameEngine.AddGameObject(new EscapeHandler(new PlayerSelectMenu()));

}

MutliplayerOptionMenu.prototype.Cleanup = function(){
    __gameEngine.Clear();
}