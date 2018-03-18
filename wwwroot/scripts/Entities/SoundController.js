var __soundController = function(){

    var _playSound = function(soundFile){
        if(this.IsMuted)
            return;
            var snd = new Audio(soundFile); // buffers automatically when created
            snd.play();
    }
    return{
        IsMuted : false,
        PlaySound: _playSound
    }
}();