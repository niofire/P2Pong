function OptionsSelector() {
    this.mOptions           = [];
    this.CursorIndex        = 0;
    this.OffsetStep         = 50;
    this.InitialOffset      = 75;
    this.Size               = 22;
    this.IsActive           = true;
    this.KeyPressDelay      = 200;
    this.mCurrentTime       = 0;
    this.SelectionCharacter = '>';
    this.mCurrentTime       = 200;
    //1 player label
}

OptionsSelector.prototype.Render = function (context) {
}

OptionsSelector.prototype.Update = function (delta, gameState) {

    this.mCurrentTime -= delta;
    
    if (this.mCurrentTime > 0)
        return;
    
    //Select current option
    if (__inputManager.keysDown[13] || __inputManager.keysDown[32]) {
        if (!this.mOptions) {
            console.log("No options in OptionsSelector:" + this);
            return;
        }

        this.mOptions[this.CursorIndex].ExecuteAction();
    }


    //Up Direction
    if (__inputManager.keysDown[87] ||  __inputManager.keysDown[38]) {
        var snd = new Audio("assets/sound/menuBoop.wav"); // buffers automatically when created
        snd.play();
        this.mCurrentTime = this.KeyPressDelay;
    
        this._removeCursor();
    
        this.CursorIndex++;
        if (this.CursorIndex >= this.mOptions.length)
            this.CursorIndex = 0;
        
        this._addCursor();
    }

    //Down Direction
    if (__inputManager.keysDown[83] ||  __inputManager.keysDown[40]) {
        var snd = new Audio("assets/sound/menuBoop.wav"); // buffers automatically when created
        snd.play();
        this.mCurrentTime = this.KeyPressDelay;

        this._removeCursor();

        this.CursorIndex--;
        if (this.CursorIndex < 0)
            this.CursorIndex = this.mOptions.length - 1;

        this._addCursor();
    }
}

OptionsSelector.prototype._refreshItems = function () {
    let center = __windowContext.GetScreenCenter();
    let offset = -(this.mOptions.length / 2);
    this.mOptions.forEach((option) => {
        var height = center[1] + this.InitialOffset + offset * this.OffsetStep; 
        option.y = height;
        option.cursor.y = height;
        offset++;
    })
    console.log(this.mOptions);
}

OptionsSelector.prototype.AddOption = function (label, action) {
    var center = __windowContext.GetScreenCenter();

    //Initialize text element
    var textElement = new TextElement(label, center[0], 0);
    textElement.Size = this.Size;
    textElement.ExecuteAction = action;

    //-----------
    // Create cursor in front of option
    //-----------
    
    //Get width of option's text label
    var ctx = __windowContext.Canvas.getContext("2d");
    ctx.font = this.Size + 'px "Press Start 2P"'
    var measure = ctx.measureText(label);
    
    //Set the cursor 20 pixels left of the option's label.
    var cursor = new TextElement(' ', center[0] - (measure.width / 2) - 20, 0);
    cursor.Alignment = "center";
    cursor.Size = this.Size;
    textElement.cursor = cursor;
    
    this.mOptions.push(textElement);
    if (this.mOptions.length == 1)
        this._addCursor();

    __gameEngine.AddGameObject(cursor);
    __gameEngine.AddGameObject(textElement);
    this._refreshItems();
}


OptionsSelector.prototype._removeCursor = function () {
    this.mOptions[this.CursorIndex].cursor.Text = this.mOptions[this.CursorIndex].cursor.Text.replace(this.SelectionCharacter, ' ');
}

OptionsSelector.prototype._addCursor = function () {
    this.mOptions[this.CursorIndex].cursor.Text = this.mOptions[this.CursorIndex].cursor.Text.replace(' ', this.SelectionCharacter);
}
