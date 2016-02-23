var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// GAME OVER SCENE
var scenes;
(function (scenes) {
    var GameOver = (function (_super) {
        __extends(GameOver, _super);
        // CONSTRUCTOR ++++++++++++++++++++++
        function GameOver() {
            _super.call(this);
        }
        // PUBLIC METHODS +++++++++++++++++++++
        // Start Method
        GameOver.prototype.start = function () {
            // add the title screen
            this._gameOverScreen = new createjs.Bitmap(assets.getResult('GameOverScreen'));
            this.addChild(this._gameOverScreen);
            // add a PLAY button to the MENU scene, in case the user wants to play more.
            this._playButton = new objects.Button("PlayButton", config.Screen.CENTER_X - 100, config.Screen.CENTER_Y + 120, true);
            this.addChild(this._playButton);
            // PLAY Button event listener
            this._playButton.on("click", this._playButtonClick, this);
            // add this scene to the global stage container
            stage.addChild(this);
            // Play the bye sound
            this._goodbyeSound = new objects.Sound('GoodbyeSound');
            this._goodbyeSound.play();
        };
        // GAME OVER Scene updates here
        GameOver.prototype.update = function (event) {
        };
        //EVENT HANDLERS ++++++++++++++++++++
        // PLAY Button click event handler
        GameOver.prototype._playButtonClick = function (event) {
            // Switch to the game scene
            scene = config.Scene.SLOT_MACHINE;
            changeScene();
        };
        return GameOver;
    })(objects.Scene);
    scenes.GameOver = GameOver;
})(scenes || (scenes = {}));
//# sourceMappingURL=gameover.js.map