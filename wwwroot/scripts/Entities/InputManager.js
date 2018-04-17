
var __inputManager = (function () {
    var _keysDown = {};
    var _isClicked = false; 

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

    window.addEventListener("load", function(event){
        var canvas = document.getElementById("GameCanvas");
        canvas.onmousedown = function(event){
            __inputManager.isClicked = true;
        }
        canvas.onmouseup = function(event){
            __inputManager.isClicked = false;
        }
    })

    return {
        keysDown: _keysDown,
        isClicked : _isClicked,
    }
})();