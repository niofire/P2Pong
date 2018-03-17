var GameMode = {
    ONE_PLAYER: 0,
    TWO_PLAYERS_LOCAL    : 1,
    TWO_PLAYERS_ONLINE   : 2,
};

var __gameState = function(){
    return {
        Player1 : new PlayerState(),
        Player2 : new PlayerState(),
        Mode: GameMode.ONE_PLAYER,
    }
}();
