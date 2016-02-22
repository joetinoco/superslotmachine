// MENU SCENE
module scenes {
    export class Menu extends objects.Scene {
        //PRIVATE INSTANCE VARIABLES ++++++++++++
        private _playButton: objects.Button;
        private _welcomeLabel: objects.Label;
        private _startupSound: objects.Sound;
        
        // CONSTRUCTOR ++++++++++++++++++++++
        constructor() {
            super();
        }
        
        // PUBLIC METHODS +++++++++++++++++++++
        
        // Start Method
        public start(): void {
            
            // add the WELCOME Label to the scene
            this._welcomeLabel = new objects.Label(
                "SUPER MARIO SLOT MACHINE",
                "20px 'Press Start 2P'",
                "#000000",
                config.Screen.CENTER_X,
                config.Screen.CENTER_Y
            );
            this.addChild(this._welcomeLabel);
            
            // add the START button to the MENU scene
            this._playButton = new objects.Button(
                "PlayButton",
                config.Screen.CENTER_X,
                config.Screen.CENTER_Y + 20,
                true);
            this.addChild(this._playButton);
            
            // START Button event listener
            this._playButton.on("click", this._startButtonClick, this);
            
            // add this scene to the global stage container
            stage.addChild(this);
            
            // Play the startup sound
            this._startupSound = new objects.Sound('StartSound');
            this._startupSound.play();
        }

        // INTRO Scene updates here
        public update(): void {

        }
               
        //EVENT HANDLERS ++++++++++++++++++++
        
        // START Button click event handler
        private _startButtonClick(event: createjs.MouseEvent) {
            // Switch to the START Scene
            scene = config.Scene.SLOT_MACHINE;
            changeScene();
        }
        
    }
}