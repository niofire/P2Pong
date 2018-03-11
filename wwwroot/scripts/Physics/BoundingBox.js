function BoundingBox(x,y,width,height){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
}

BoundingBox.prototype.IsColliding = function(boundingBox){

    return (this.x < boundingBox.x + boundingBox.width || this.x + this.width > boundingBox.x)
        && (this.y < boundingBox.y + boundingBox.height || this.y + this.height > boundingBox.y);
         
}