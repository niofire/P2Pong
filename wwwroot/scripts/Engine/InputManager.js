
var inputManager = (function(){
    var _keysDown = {};

    window.addEventListener("keydown", function(event){
        _keysDown[event.keyCode || e.which] = true;
    },true);
    
    window.addEventListener("keyup", function(event){
        _keysDown[event.keyCode || e.which] = false;
        delete _keysDown[event.keyCode];
    },true)

    return{
        keysDown: _keysDown
    }
})();
