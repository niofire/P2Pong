
var engine = function () {

    var FPS = 30;

    var _update = function (delta) {
        window.requestAnimationFrame(_update);
        console.log("update");
        //_render();
    }

    var _render = function(){
        console.log("render");
    }

    _update();
    return {
        FPS,
    }
}
