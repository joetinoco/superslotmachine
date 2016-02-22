module objects {
    export class Sound {
        constructor(private _sfxName: string){
        }
        
        public play(){
            var instance = createjs.Sound.play(this._sfxName);
            instance.volume = 0.5;
            instance.pan = 0.5;
        }
    }
}