function GameOverScreen(gameEngine) {
    this._gameEngine = gameEngine;
    this.IsActive = true;

    this._timer = 500;
}

GameOverScreen.prototype.Update = function (delta, gameState) {

    this._timer -= delta;
    if (this._timer > 0)
        return;

    if (__inputManager.keysDown[13] || __inputManager.keysDown[32]) {
        __soundController.PlaySound(__soundAssets.OnMenuNavigate);
        __screenManager.ChangeScreen(new PlayerSelectMenu());
    }
}

GameOverScreen.prototype.Setup = function () {

    //Add title
    __gameEngine.AddGameObject(new TitleLabel());
    __gameEngine.AddGameObject(new TextElement(__gameState.Winner.Name + " Wins!", __windowContext.GetWidthPercent(0.5), __windowContext.GetHeightPercent(0.5)));

    //If any key is pressed, go to start menu.
}

GameOverScreen.prototype.Cleanup = function () {
    __gameEngine.Clear();
}