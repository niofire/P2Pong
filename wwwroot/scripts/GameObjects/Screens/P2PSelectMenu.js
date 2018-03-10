function P2PSelectMenu(gameEngine){
    this._gameEngine = gameEngine;
    this.IsActive = true;
}

P2PSelectMenu.prototype.Update = function(delta, gameState){

}

P2PSelectMenu.prototype.Setup = function(){
    
    //Add title
    __gameEngine.AddGameObject(new TitleLabel());

    var selector = new OptionsSelector();
    selector.AddOption("HOST", function(){
        __screenManager.ChangeScreen(new HostMenu());
    })

    selector.AddOption("JOIN", function(){
        __screenManager.ChangeScreen(new JoinMenu());
    })

    __gameEngine.AddGameObject(selector);
}

P2PSelectMenu.prototype.Cleanup = function(){
    __gameEngine.Clear();
}