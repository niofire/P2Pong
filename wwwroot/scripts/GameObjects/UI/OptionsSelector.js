function OptionsSelector() {
    this.TextElement = new TextElement("PONG", center[0], 60);
    this.TextElement.Alignment = "center";
    this.TextElement.Size = 22;
    this.IsActive = true;
    this.offsetStep = 30;

    this._options = [];


    var center = __windowContext.GetScreenCenter();
    center[1] += 50;
    var labelOffsets = 25;
    var textSize = 22;
    //1 player label
    this.CursorIndex = 0;
    var onePlayerLabel = new TextElement("1 PLAYER", center[0], center[1] - labelOffsets);
    onePlayerLabel.Size = textSize;
    var twoPlayerLabel = new TextElement("2 PLAYER", center[0], center[1] + labelOffsets);
    twoPlayerLabel.Size = textSize;

    __gameEngine.AddGameObject(onePlayerLabel);
    __gameEngine.AddGameObject(twoPlayerLabel);
}

OptionsSelector.prototype.Render = function (context) {
}

OptionsSelector.prototype.Update = function (delta, gameState) {

    //Select current option
    if (__inputManager.keysDown[13] || __inputManager.keysDown[32]) {

        if (!this._options) {
            console.log("No options in OptionsSelector:" + this);
            return;
        }

        _options[index].ExecuteAction();
    }

    if (__inputManager.keysDown[87])
    {
        index++;
        if(index >= _options.length)
            index = 0;
    }
    if (__inputManager.keysDown[83]){
        index--;
        if(index < 0)
            index = _options.length - 1;
    }
 }

OptionsSelector.prototype.AddOption = function (label, action) {
    var center = __windowContext.GetScreenCenter();
    var textElement = new TextElement(label, center[0], 0);
    textElement.ExecuteAction = action;
    this._options.push(textElement);

    __gameEngine.AddGameObject(textElement);
}

OptionSelector.prototype._refreshItems = function () {
    let center = __windowContext.GetScreenCenter();
    let offset = -(_options.length / 2);
    _options.forEach((option) => {
        option.y = offset * offsetStep;
        offset++;
    })
}