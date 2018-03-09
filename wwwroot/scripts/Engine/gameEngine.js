function GameEngine(renderContext, screenManager) {

    var self = this;

    var _lastFrame = 0;
    var _renderContext = renderContext;
    var _screenManager = screenManager;
    
    var _gameState = {renderContext:renderContext, screenManager : _screenManager};
    var _animator =
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60)
        };

    this.gameObjects = [];
    
    var _mainLoop = function (timeElapsed) {

        _animator(_mainLoop);
        var delta = timeElapsed - _lastFrame;
        _lastFrame = timeElapsed;
        
        _update(delta, _gameState);
        _render(_renderContext);
    }

    var _update = function (delta, gameState) {

        if (!self.gameObjects)
            return;

        self.gameObjects.forEach((gameObject) => {
            if (!gameObject.IsActive)
                return;
            gameObject.Update(delta, gameState);
        })
    }

    var _render = function (renderContext) {

        renderContext.Clear();

        if (!self.gameObjects)
            return;

        self.gameObjects.forEach((gameObject) => {
            if (!gameObject.IsActive || !gameObject.Render)
                return;
            gameObject.Render(renderContext.context);
        })
    }

    _mainLoop(0);
}

GameEngine.prototype.AddGameObject = function (gameObject) {
    this.gameObjects.push(gameObject);
}

GameEngine.prototype.Clear = function(){
    this.gameObjects = [];
}