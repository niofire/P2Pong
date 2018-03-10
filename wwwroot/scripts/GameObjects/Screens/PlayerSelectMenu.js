function PlayerSelectMenu(gameEngine){
    this._gameEngine = gameEngine;
}

PlayerSelectMenu.prototype.Update = function(delta, gameState){

}

PlayerSelectMenu.prototype.Setup = function(){
    
    //Add title
    __gameEngine.AddGameObject(new TitleLabel());
    var center = __windowContext.GetScreenCenter();
    center[1] += 50;
    var labelOffsets = 25;
    var textSize = 22;
    //1 player label

    var onePlayerLabel = new TextElement("1 PLAYER", center[0], center[1] - labelOffsets );
    onePlayerLabel.Size = textSize;
    var twoPlayerLabel = new TextElement("2 PLAYER", center[0], center[1] + labelOffsets );
    twoPlayerLabel.Size = textSize;

    __gameEngine.AddGameObject(onePlayerLabel);
    __gameEngine.AddGameObject(twoPlayerLabel);
}

PlayerSelectMenu.prototype.Cleanup = function(){

}