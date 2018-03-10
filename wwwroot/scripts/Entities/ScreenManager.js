
var screenManager = function () {

    var _changeScreen = function (screen) {

        if (this.currentScreen)
            this.currentScreen.Cleanup();
            
        __gameEngine.AddGameObject(screen);
        this.currentScreen = screen;
        screen.Setup();
    }

    return {
        ChangeScreen:  _changeScreen,
    }
}();