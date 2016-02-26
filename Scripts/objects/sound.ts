module objects {
    // SOUND CLASS ++++++++++++++++++++++++++
    //
    // Represent a game sound that can be controlled at runtime
    //
    export class Sound {
        //PRIVATE INSTANCE VARIABLES
        private _instance: createjs.AbstractSoundInstance;
       
        // CONSTRUCTOR +++++++++++++++++++++
        constructor(private _sfxName: string){
        }
        
        // PUBLIC METHODS +++++++++++++++++++++
        
        // Start audio playback
        public play(loop:number = 0){
            this._instance = createjs.Sound.play(this._sfxName);
            this._instance.loop = loop; // Defaults to 0 (not looping)
            this._instance.volume = 0.5;
            this._instance.pan = 0.5; // Has to be this due to a SoundJS bug.
        }
        
        // Stop audio playback
        public stop(){
            this._instance.stop();
        }
    }
}