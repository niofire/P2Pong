function StartMenu(gameEngine){
    this._gameEngine = gameEngine;
}


StartMenu.prototype.Setup = function(){
    
    var screenCenter = windowContext.GetScreenCenter();
    
    //Title Label
    var title = new TextElement("PONG", screenCenter[0], 60);
    title.Alignment = "center";
    title.Size = 30;
    this._gameEngine.AddGameObject(title);

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

    this._gameEngine.AddGameObject(startGameLabel);
}

StartMenu.prototype.Cleanup = function(){
    _gameEngine.Clear();
}

StartMenu.prototype.Update = function(delta, gameState){
    //if spacebar or enter-, goes to next screen
    console.log(inputManager.keysDown);
    if(false){
        screenManager.ChangeScreen(new PlayerSelectMenu(gameEngine));
    }
}