function RenderContext(canvas){

    this.context     = canvas.getContext("2d");
    this.canvas      = canvas;
    this.maxHeight   = 500;
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


    this.AdjustFramePosition();
}


RenderContext.prototype.AdjustFramePosition = function() {
    var parent = this.canvas.parentNode.parentElement;
    var parentSize = [ parent.clientWidth, parent.clientHeight];

    this.canvas.style.left = ((parentSize[0] - this.canvas.width) / 2) + "px";
    this.canvas.style.top = ((parentSize[1] - this.canvas.height) / 2) + "px";

}