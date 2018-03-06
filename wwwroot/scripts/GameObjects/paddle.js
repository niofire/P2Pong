var paddle = function(){

    var y = 10;
    var speed = 2;
    var _update = function(delta){
        if(inputManager.keysDown[87])
            y-= speed * 0.06 * delta;
        if(inputManager.keysDown[83])
            y+= speed * 0.06 * delta;
    }

    var _updatePosition = function(event){
    }
    
    window.addEventListener("keydown", _updatePosition);

    var _render = function(context){
        context.beginPath();
        context.fillStyle = "#FFFFFF";
        context.fillRect(10,y,10,50);
    }

    return {
        update: _update,
        render: _render,
        isActive: true
    }
}