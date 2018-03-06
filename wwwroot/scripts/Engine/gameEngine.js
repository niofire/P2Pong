
var engine = function () {

    var lastFrame = 0;
    var count = 0;
    var _gameCanvas = document.getElementById("GameCanvas");
    var _renderContext = _gameCanvas.getContext("2d");
    var _gameObjects = [];

    var _mainLoop = function(timeElapsed){
        window.requestAnimationFrame(_mainLoop);
        var delta = timeElapsed - lastFrame;
        lastFrame = timeElapsed;
        console.log("Ad");
        _update(delta);
        _render(_renderContext);
    }

    var _update = function (delta) {
        _gameObjects.forEach((gameObject)=>{
            if(!gameObject.isActive)
                return;
            gameObject.update(delta);
        })
    }

    var _render = function(context){

        _clearRect(context);

        _gameObjects.forEach((gameObject)=>{
            if(!gameObject.isActive)
                return;
            
            gameObject.render(context);
        })
    }

    var _addGameObject = function(gameObject){
        _gameObjects.push(gameObject);
    }

    var _clearRect = function(context){
        context.clearRect(0, 0, _gameCanvas.width, _gameCanvas.height);
    }

    _mainLoop();
    return {
        addGameObject: _addGameObject
    }
}
