//Host menu - connect to websocket server and send id, wait for incoming connections.

function HostMenu(gameEngine) {
    this._gameEngine = gameEngine;
    this.IsActive = true;

    this.Offset = 25;

    this._copyNotice = null;
    this._copyTimer = 0;

}

HostMenu.prototype.Update = function (delta, gameState) {
    // console.log(__inputManager.isClicked);
    this._copyTimer -= delta;
    if (this._copyTimer < 0) {
        this._copyNotice.Text = "... Click to copy friend code ...";
    }
}

HostMenu.prototype.Setup = function () {

    var self = this;
    __inputManager.onCanvasClick = function () {
        if (self._copyTimer < 0) {
            self._copyTimer = 1500;
            self._copyNotice.Text = "Copied friend code to Clipboard!";
            __clipboard.Copy("Hello, World???");
        }
    }

    var center = __windowContext.GetScreenCenter();

    //Register with backend STUN server.
    __networkService.WebSocketServer.Connect();

    //Add title
    __gameEngine.AddGameObject(new TitleLabel());

    var shareCodeLabel = new TextElement("SHARE CODE", center[0], center[1] - this.Offset);
    shareCodeLabel.Size = 22;

    var shareCodeContent = new TextElement(__networkService.WebSocketServer.Id, center[0], center[1]);
    shareCodeContent.Size = 15;
    this._copyNotice = new TextElement("... Click to copy friend code ...", center[0], center[1] + this.Offset * 4);
    this._copyNotice.Size = 18;

    __gameEngine.AddGameObject(shareCodeContent);
    __gameEngine.AddGameObject(this._copyNotice);
    __gameEngine.AddGameObject(shareCodeLabel);

    var muteDisclaimer = new MuteDisclaimer();
    __gameEngine.AddGameObject(muteDisclaimer);
    __gameEngine.AddGameObject(new EscapeHandler(new PlayerSelectMenu()));

    var canvas = document.getElementById("GameCanvas");
    var textbox = document.createElement('input');
    textbox.type = "text";
    textbox.parentElement = canvas;
}

HostMenu.prototype.Cleanup = function () {
    __gameEngine.Clear();

    __inputManager.onCanvasClick = null;
}