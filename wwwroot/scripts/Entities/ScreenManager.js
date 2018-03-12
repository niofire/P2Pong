
var __screenManager = function () {

    var _changeScreen = function (screen) {

        if (this.currentScreen)
            this.currentScreen.Cleanup();
            
        this.currentScreen = screen;
        screen.Setup();
        __gameEngine.AddGameObject(screen);
    }

    return {
        ChangeScreen:  _changeScreen,
    }
}();