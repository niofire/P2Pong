
window.onload = function(){
    var canvas = document.getElementById("GameCanvas");
    var ctx = canvas.getContext("2d");
    var gameEngine = engine();
    console.log(gameEngine.FPS);
}

