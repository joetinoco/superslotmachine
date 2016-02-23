// MENU SCENE
module scenes {
    export class Menu extends objects.Scene {
        //PRIVATE INSTANCE VARIABLES ++++++++++++
        private _playButton: objects.Button;
        private _titleScreen: createjs.Bitmap;
        private _startupSound: objects.Sound;
        
        // CONSTRUCTOR ++++++++++++++++++++++
        constructor() {
            super();
        }
        
        // PUBLIC METHODS +++++++++++++++++++++
        
        // Start Method
        public start(): void {
            
            // add the title screen
            this._titleScreen = new createjs.Bitmap(assets.getResult('TitleScreen'));
            this.addChild(this._titleScreen);
            
            // add the PLAY button to the MENU scene
            this._playButton = new objects.Button(
                "PlayButton",
                config.Screen.CENTER_X,
                config.Screen.CENTER_Y + 20,
                true);
            this.addChild(this._playButton);
            
            // PLAY Button event listener
            this._playButton.on("click", this._startButtonClick, this);
            
            // add this scene to the global stage container
            stage.addChild(this);
            
            // Play the startup sound
            this._startupSound = new objects.Sound('StartSound');
            this._startupSound.play();
        }

        // INTRO Scene updates here
        public update(event: createjs.Event): void {

        }
               
        //EVENT HANDLERS ++++++++++++++++++++
        
        // PLAY Button click event handler
        private _startButtonClick(event: createjs.MouseEvent) {
            // Switch to the game scene
            scene = config.Scene.SLOT_MACHINE;
            changeScene();
        }
        
    }
}