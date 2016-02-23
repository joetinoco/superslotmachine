// GAME OVER SCENE
module scenes {
    export class GameOver extends objects.Scene {
        //PRIVATE INSTANCE VARIABLES ++++++++++++
        private _playButton: objects.Button;
        private _gameOverScreen: createjs.Bitmap;
        private _goodbyeSound: objects.Sound;
        
        // CONSTRUCTOR ++++++++++++++++++++++
        constructor() {
            super();
        }
        
        // PUBLIC METHODS +++++++++++++++++++++
        
        // Start Method
        public start(): void {
            
            // add the title screen
            this._gameOverScreen = new createjs.Bitmap(assets.getResult('GameOverScreen'));
            this.addChild(this._gameOverScreen);
            
            // add a PLAY button to the scene, in case the user wants to play more.
            this._playButton = new objects.Button(
                "PlayButton",
                config.Screen.CENTER_X - 100,
                config.Screen.CENTER_Y + 120,
                true);
            this.addChild(this._playButton);
            
            // PLAY Button event listener
            this._playButton.on("click", this._playButtonClick, this);
            
            // add this scene to the global stage container
            stage.addChild(this);
            
            // Play the bye sound
            this._goodbyeSound = new objects.Sound('GoodbyeSound');
            this._goodbyeSound.play();
        }

        // GAME OVER Scene updates here
        public update(event: createjs.Event): void {

        }
               
        //EVENT HANDLERS ++++++++++++++++++++
        
        // PLAY Button click event handler
        private _playButtonClick(event: createjs.MouseEvent) {
            // Switch to the game scene
            scene = config.Scene.SLOT_MACHINE;
            changeScene();
        }
        
    }
}