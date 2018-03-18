
var __soundController = function(){

    var self = this;
    window.addEventListener("keydown", function (event) {
        if(event.keyCode == 77)
            this.IsMuted = !this.IsMuted;
    }, true);

    var _playSound = function(soundBit){
        if(self.IsMuted)
            return;
        soundBit.play();
    }
    return{
        IsMuted : false,
        PlaySound: _playSound
    }
}();