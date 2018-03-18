var __soundController = function(){

    var self = this;
    window.addEventListener("keydown", function (event) {
        if(event.keyCode == 77)
            this.IsMuted = !this.IsMuted;
    }, true);

    var _playSound = function(soundFile){
        if(self.IsMuted)
            return;
        var snd = new Audio(soundFile); // buffers automatically when created
        snd.play();
    }
    return{
        IsMuted : false,
        PlaySound: _playSound
    }
}();