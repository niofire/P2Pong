function ScreenManager(){

}

ScreenManager.prototype.ChangeScreens = function(screen){

    if(this.currentScreen)
        this.currentScreen.Cleanup();
        
    this.currentScreen = screen;
    screen.Setup();
    screen.Play();
}

ScreenManager.prototype.Pause = function(){

}

ScreenManager.prototype.Play = function(){
    
}