var renderContext = function(canvas){

    var _canvas = canvas;
    var _context = canvas.getContext("2d");

    var _resize = function(){
        _canvas.width = window.innerWidth;
        _canvas.height = window.innerHeight;
    }

    var _clear = function(){
        _context.clearRect(0, 0, _canvas.width, _canvas.height);
    }


    _resize();
    return{
        ctx: _context,
        clear : _clear
    }
}