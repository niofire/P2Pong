function JoinMenu(gameEngine){
    this._gameEngine = gameEngine;
    this.IsActive = true;
}

JoinMenu.prototype.Update = function(delta, gameState){

}

JoinMenu.prototype.Setup = function(){
    
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

JoinMenu.prototype.Cleanup = function(){
    __gameEngine.Clear();
}