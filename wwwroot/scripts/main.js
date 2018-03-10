
window.onload = function(){

    //var gameInstance = new GameInstance(document.getElementById("GameCanvas"));

    //Start game, boot up intro screen
    
    console.log(__gameState);
    console.log(__screenManager);
    __gameState.Player1.Name = "Player1";
    __gameState.Player2.Name = "Player2";
    __screenManager.ChangeScreen(new StartMenu());
    //
    //Start network node.
    //Start game node
}

window.addEventListener("keydown", function (e) {

    // Disable Space + Arrow keys
    if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }

}, false);