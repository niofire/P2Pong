function RenderContext(canvas){

    this.context     = canvas.getContext("2d");
    this.canvas      = canvas;
    this.maxHeight   = 750;
    this.aspectRatio = 16.0/10.0;

    this.Resize();
}


RenderContext.prototype.Clear = function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
}

RenderContext.prototype.Resize = function(){
    if(window.innerHeight * this.aspectRatio < window.innerWidth){
        //height is limiting the window size
        this.canvas.height = Math.min(window.innerHeight, this.maxHeight);
    }
    else{
        //width is limiting window size
        this.canvas.height = Math.min(window.innerWidth / this.aspectRatio, this.maxHeight);
    }
    this.canvas.width = this.canvas.height * this.aspectRatio;
}