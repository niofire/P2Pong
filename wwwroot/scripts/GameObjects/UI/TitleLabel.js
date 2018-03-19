function TitleLabel() {
    var center                 = __windowContext.GetScreenCenter();
    this.TextElement           = new TextElement("PONG", center[0],  __windowContext.GetHeightPercent(0.13));
    this.TextElement.Alignment = "center";
    this.TextElement.Size      = 30;
    this.IsActive              = true;
}

TitleLabel.prototype.Render = function (context) {
    this.TextElement.Render(context);
}

TitleLabel.prototype.Update = function (delta, gameState) {
    this.TextElement.Update(delta, gameState);

}