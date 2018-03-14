
window.onload = function(){
    __gameState.Player1.Name = "Player1";
    __gameState.Player2.Name = "Player2";
    __screenManager.ChangeScreen(new StartMenu());
}

window.addEventListener("keydown", function (e) {

    // Disable Space + Arrow keys
    if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }

}, false);