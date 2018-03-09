
var screenManager = function (renderContext) {

    var _changeScreen = function () {

        if (this.currentScreen)
            this.currentScreen.Cleanup();

        this.currentScreen = screen;
        screen.Setup(renderContext);
        screen.Play();
    }


    return {
        ChangeScreen = _changeScreen,
    }
}();