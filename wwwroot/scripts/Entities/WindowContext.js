var __windowContext = function(){

    var mIsInitialized = false;
    this.c;
    var self = this;
    var ca;
    var maxHeight = 500;
    var aspectRatio = 16.0/10.0
    var canvas;
    var _adjustFramePosition = function(){
        var parent = canvas.parentNode.parentElement;
        var parentSize = [ parent.clientWidth, parent.clientHeight];
    
        canvas.style.left = ((parentSize[0] - canvas.width) / 2) + "px";
        canvas.style.top = ((parentSize[1] - canvas.height) / 2) + "px";
    }

    var _getScreenCenter = function(){
        return [canvas.width / 2, canvas.height / 2];
    }

    window.addEventListener("load", function(){
        _init();
    });

    var _resize = function(){
        if(window.innerHeight * aspectRatio < window.innerWidth){
            //height is limiting the window size
            canvas.height = Math.min(window.innerHeight, maxHeight);
        }
        else{
            //width is limiting window size
            canvas.height = Math.min(window.innerWidth / aspectRatio, maxHeight);
        }
    
        canvas.width = canvas.height * aspectRatio;
        _adjustFramePosition();
    }

    var _init = function(){
        if(mIsInitialized)
            return;
        mIsInitialized = true;
        canvas =  document.getElementById("GameCanvas");
        __windowContext.Canvas = document.getElementById("GameCanvas");

        _resize();
    }

    return {
        GetScreenCenter : _getScreenCenter,
        Resize : _resize,
        Canvas : canvas,
        Init : _init
    }
}();