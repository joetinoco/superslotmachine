var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// MENU SCENE
var scenes;
(function (scenes) {
    var Menu = (function (_super) {
        __extends(Menu, _super);
        // CONSTRUCTOR ++++++++++++++++++++++
        function Menu() {
            _super.call(this);
        }
        // PUBLIC METHODS +++++++++++++++++++++
        // Start Method
        Menu.prototype.start = function () {
            // add the WELCOME Label to the scene
            this._welcomeLabel = new objects.Label("SUPER MARIO SLOT MACHINE", "20px 'Press Start 2P'", "#000000", config.Screen.CENTER_X, config.Screen.CENTER_Y);
            this.addChild(this._welcomeLabel);
            // add the START button to the MENU scene
            this._playButton = new objects.Button("PlayButton", config.Screen.CENTER_X, config.Screen.CENTER_Y + 20, true);
            this.addChild(this._playButton);
            // START Button event listener
            this._playButton.on("click", this._startButtonClick, this);
            // add this scene to the global stage container
            stage.addChild(this);
        };
        // INTRO Scene updates here
        Menu.prototype.update = function () {
        };
        //EVENT HANDLERS ++++++++++++++++++++
        // START Button click event handler
        Menu.prototype._startButtonClick = function (event) {
            // Switch to the START Scene
            scene = config.Scene.SLOT_MACHINE;
            changeScene();
        };
        return Menu;
    })(objects.Scene);
    scenes.Menu = Menu;
})(scenes || (scenes = {}));
//# sourceMappingURL=menu.js.map