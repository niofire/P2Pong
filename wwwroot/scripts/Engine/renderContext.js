var renderContext = function(canvas){

    var _canvas = canvas;
    var _context = canvas.getContext("2d");

    var _resize = function(){
        var pa = _canvas.parentElement;

        console.log(pa.width);
        _canvas.width = 1200;
        _canvas.height = 600;
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