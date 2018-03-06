
var engine = function () {

    var lastFrame = 0;
    var count = 0;
    var _renderContext = renderContext(document.getElementById("GameCanvas"));
    var _gameObjects = [];
    var _animator =  window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
        window.setTimeout(callback, 1000 / 60)
    };

    var _mainLoop = function(timeElapsed){
        _animator(_mainLoop);
        var delta = timeElapsed - lastFrame;
        lastFrame = timeElapsed;

        _update(delta);
        _render(_renderContext);
    }

    var _update = function (delta, state) {

        _gameObjects.forEach((gameObject)=>{
            if(!gameObject.isActive)
                return;
            gameObject.update(delta);
        })
    }

    var _render = function(renderContext){

        renderContext.clear();

        _gameObjects.forEach((gameObject)=>{
            if(!gameObject.isActive)
                return;
            
            gameObject.render(renderContext.ctx);
        })
    }

    var _addGameObject = function(gameObject){
        _gameObjects.push(gameObject);
    }

    _mainLoop();
    return {
        addGameObject: _addGameObject
    }
}
