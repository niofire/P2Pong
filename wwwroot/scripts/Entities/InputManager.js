
var __inputManager = (function () {
    var _keysDown = {};

    window.addEventListener("keydown", function (event) {
        _keysDown[event.keyCode || e.which] = true;
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