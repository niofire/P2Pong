
var __inputManager = (function () {
    var _keysDown = {};

    window.addEventListener("keydown", function (event) {
        _keysDown[event.keyCode || e.which] = true;
        // Disable Space + Arrow keys
        if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
            e.preventDefault();
        }

    }, true);

    window.addEventListener("keyup", function (event) {
        _keysDown[event.keyCode || e.which] = false;
    }, true)

    window.addEventListener("blur", function (event) {
        _keysDown[83] = false;
        _keysDown[87] = false;
        _keysDown[38] = false;
        _keysDown[40] = false;
    });

    return {
        keysDown: _keysDown
    }
})();