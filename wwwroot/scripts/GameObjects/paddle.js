var paddle = function(){

    var _update = function(delta){
    }

    var count = 0;
    var _render = function(context){
        context.fillStyle = "#FFFFFF";
        context.rect(20,20,150 + count,150);
        context.fill();
    }

    return {
        update: _update,
        render: _render,
        isActive: true
    }
}