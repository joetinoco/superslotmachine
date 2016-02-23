module objects {
    export class Sound {
        private _instance: createjs.AbstractSoundInstance;
        
        constructor(private _sfxName: string){
        }
        
        public play(loop:number = 0){
            this._instance = createjs.Sound.play(this._sfxName);
            this._instance.loop = loop;
            this._instance.volume = 0.5;
            this._instance.pan = 0.5;
        }
        
        public stop(){
            this._instance.stop();
        }
    }
}