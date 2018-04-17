//Accept the ID of the person hosting as input.
function JoinMenu(gameEngine){
    this._gameEngine = gameEngine;
    this.IsActive = true;
}

JoinMenu.prototype.Update = function(delta, gameState){

}

JoinMenu.prototype.Setup = function(){
    
    //Register user with STUN server.

    __networkService.WebSocketServer.Connect();
    //Add title
    __gameEngine.AddGameObject(new TitleLabel());

    var selector = new OptionsSelector();
    
    selector.AddOption("JOIN", function(){
        var targetId = "";
        __networkService.PeerConnection.Connect(targetId);
        //Initiate P2P handshake
    })
    var textbox = document.createElement("input");
    textbox.type = "text";

    var muteDisclaimer = new MuteDisclaimer();
    __gameEngine.AddGameObject(muteDisclaimer);

    __gameEngine.AddGameObject(selector);
    __gameEngine.AddGameObject(new EscapeHandler(new P2PSelectMenu()));

}

JoinMenu.prototype.Cleanup = function(){
    __gameEngine.Clear();
}