var __gameEngine = function() {

    var mIsInitialize = false;
    var self      = this;
    var lastFrame = 0;
    var mGameState;

    window.addEventListener("load", function(){
        __windowContext.Init();
        _init();
    });

    var _animator =
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60)
        };

    var mGameObjects = [];

    var _mainLoop = function (timeElapsed) {

        _animator(_mainLoop);
        var delta = timeElapsed - lastFrame;
        lastFrame = timeElapsed;

        _update(delta, mGameState);
        _render(ctx);
    }

    var _update = function (delta, gameState) {
        if (!mGameObjects)
            return;

        mGameObjects.forEach((gameObject) => {

            if (!gameObject.IsActive || !gameObject.Update)
                return;
            
            gameObject.Update(delta, gameState);
        })
    }

    var _render = function (ctx) {

        ctx.clearRect(0, 0, __windowContext.Canvas.width, __windowContext.Canvas.height);

        if (!mGameObjects)
            return;

        mGameObjects.forEach((gameObject) => {
            
            if (!gameObject.IsActive || !gameObject.Render)
                return;

            gameObject.Render(ctx);
        })
    }

    var _addGameObject = function(gameObject){
        if(!gameObject)
            return;
        mGameObjects.push(gameObject);
    }

    var _clear = function(){
        mGameObjects = [];
    }

    var _setState = function(gameState){
        mGameState = gameState;
    }

    var _init = function(){
        if(mIsInitialize)
            return;
        mIsInitialize = true;
        ctx =  __windowContext.Canvas.getContext("2d");
        __gameEngine.ctx =  ctx;
        _mainLoop(0);
    }
    return{
        AddGameObject : _addGameObject,
        Clear : _clear
    }
}();