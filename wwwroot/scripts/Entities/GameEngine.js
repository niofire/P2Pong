var __gameEngine = function() {

    var mIsInitialize = false;
    var self      = this;
    var lastFrame = 0;
    var mGameState;

    window.addEventListener("load", function(){
        __windowContext.Init();
        _Init();
    });

    var _Animator =
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60)
        };

    var mGameObjects = [];

    var _MainLoop = function (timeElapsed) {

        _Animator(_MainLoop);
        var delta = timeElapsed - lastFrame;
        lastFrame = timeElapsed;

        _Update(delta, mGameState);
        _Render(ctx);
    }

    var _Update = function (delta, gameState) {
        if (!mGameObjects)
            return;

        mGameObjects.forEach((gameObject) => {

            if (!gameObject.IsActive || !gameObject.Update || gameObject.IsPaused)
                return;
            
            gameObject.Update(delta, gameState);
        })
    }

    var _Render = function (ctx) {

        ctx.clearRect(0, 0, __windowContext.Canvas.width, __windowContext.Canvas.height);

        if (!mGameObjects)
            return;

        mGameObjects.forEach((gameObject) => {
            
            if (!gameObject.IsActive || !gameObject.Render)
                return;

            gameObject.Render(ctx);
        })
    }

    var _AddGameObject = function(gameObject){
        if(!gameObject)
            return;
        mGameObjects.push(gameObject);
    }

    var _Clear = function(){
        mGameObjects = [];
    }

    var _SetState = function(gameState){
        mGameState = gameState;
    }

    var _Init = function(){
        if(mIsInitialize)
            return;
        mIsInitialize = true;
        ctx =  __windowContext.Canvas.getContext("2d");
        __gameEngine.ctx =  ctx;
        _MainLoop(0);
    }
    var _Pause = function(){
        mGameObjects.forEach((gameObject) =>{
            gameObject.IsPaused = true;
        })
    }

    var _Resume = function(){
        mGameObjects.forEach((gameObject) =>{
            gameObject.IsPaused = false;
        })
    }
    return{
        AddGameObject : _AddGameObject,
        Clear : _Clear,
        Pause : _Pause,
        Resume : _Resume
    }
}();