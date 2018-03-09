var windowContext = function(){

    var canvas = document.getElementById("GameCanvas");
    var maxHeight = 500;
    var aspectRatio = 16.0/10.0
    


    var _adjustFramePosition = function(){
        var parent = canvas.parentNode.parentElement;
        var parentSize = [ parent.clientWidth, parent.clientHeight];
    
        canvas.style.left = ((parentSize[0] - canvas.width) / 2) + "px";
        canvas.style.top = ((parentSize[1] - canvas.height) / 2) + "px";
    }

    var _getScreenCenter = function(){
        return [canvas.width / 2, canvas.height / 2];
    }

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

    return {
        GetScreenCenter : _getScreenCenter,
        Resize : _resize
    }
}();