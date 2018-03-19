function HostMenu(gameEngine){
    this._gameEngine = gameEngine;
    this.IsActive = true;

    this.Offset = 25;
}

HostMenu.prototype.Update = function(delta, gameState){

}

HostMenu.prototype.Setup = function(){
    
    //Add title
    __gameEngine.AddGameObject(new TitleLabel());

    var center = __windowContext.GetScreenCenter();
    var shareCodeLabel = new TextElement("SHARE CODE", center[0], center[1] - this.Offset);
    shareCodeLabel.Size = 22;

    var shareCodeContent = new TextElement("0ce064a8-17f2-4643-9a34-18bd51b4a181", center[0], center[1]);
    shareCodeContent.Size = 15;
    var waitingAnimation = new TextElement("... Waiting for Friend ...", center[0], center[1] + this.Offset * 4);
    waitingAnimation.Size = 22;
    __gameEngine.AddGameObject(shareCodeContent);
    __gameEngine.AddGameObject(waitingAnimation);
    __gameEngine.AddGameObject(shareCodeLabel);

    var muteDisclaimer = new MuteDisclaimer();
    __gameEngine.AddGameObject(muteDisclaimer);

}

HostMenu.prototype.Cleanup = function(){
    __gameEngine.Clear();
}