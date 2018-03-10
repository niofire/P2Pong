function StartMenu(){
    this.IsActive = true;
}


StartMenu.prototype.Setup = function(){
    
    var screenCenter = __windowContext.GetScreenCenter();
    
    //Title Label
    __gameEngine.AddGameObject(new TitleLabel());

    //Start game label
    var startGameLabel = new TextElement("START GAME", screenCenter[0], screenCenter[1] + 50);
    startGameLabel.Alignment = "center";
    startGameLabel.Size = 22;
    var black = "#000000";
    var white = "#FFFFFF";
    var time = 0;
    var blinkRate = [800,400];
    this.color = "#FFFFFF";

    startGameLabel.Effect = function(delta, gameState){
        time += delta;
        if(this.color == white && time > blinkRate[0]){
            time = 0;
            this.color = black;
        }
        else if(this.color == black && time > blinkRate[1]){
            time = 0;
            this.color = white;
        }
    }

    __gameEngine.AddGameObject(startGameLabel);
}

StartMenu.prototype.Cleanup = function(){
    __gameEngine.Clear();
}

StartMenu.prototype.Update = function(delta, gameState){
    //if spacebar or enter-, goes to next screen
    if(__inputManager.keysDown[13] || __inputManager.keysDown[32])
        screenManager.ChangeScreen(new PlayerSelectMenu());
}