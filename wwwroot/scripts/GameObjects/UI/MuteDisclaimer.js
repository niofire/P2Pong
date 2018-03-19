function MuteDisclaimer() {
    var muteDisclaimer = new TextElement('Press "m" to mute.',__windowContext.GetWidthPercent(0.99),__windowContext.GetHeightPercent(0.98));
    muteDisclaimer.Size = 12;
    muteDisclaimer.Alignment = "right";
    __gameEngine.AddGameObject(muteDisclaimer);
}