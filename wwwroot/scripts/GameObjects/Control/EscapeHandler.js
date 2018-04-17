function EscapeHandler(nextScreen){
    this._nextScreen = nextScreen;
    this.IsActive = true;
    this._timer = 500;
}

EscapeHandler.prototype.Setup = function(){

}

EscapeHandler.prototype.Cleanup = function(){

}

EscapeHandler.prototype.Update = function(delta){
    this._timer -= delta;

    if (__inputManager.keysDown[27] && this._timer < 0)
        __screenManager.ChangeScreen(this._nextScreen);
}