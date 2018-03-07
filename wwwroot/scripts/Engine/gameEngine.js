
function GameEngine(renderContext) {

    var self = this;

    var _lastFrame = 0;
    var _renderContext = renderContext;
    var _gameState = {renderContext:renderContext};
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
            if (!gameObject.isActive)
                return;
            gameObject.update(delta, gameState);
        })
    }

    var _render = function (renderContext) {

        renderContext.Clear();

        if (!self.gameObjects)
            return;
        self.gameObjects.forEach((gameObject) => {
            if (!gameObject.isActive)
                return;

            gameObject.render(renderContext.context);
        })
    }

    _mainLoop();
}

GameEngine.prototype.AddGameObject = function (gameObject) {
    this.gameObjects.push(gameObject);
}