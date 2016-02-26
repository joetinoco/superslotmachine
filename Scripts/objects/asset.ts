module objects {
    // ASSET CLASS ++++++++++++++++++++++++++
    //
    // Used to preload and store game assets
    // 
    export class Asset {
        //PUBLIC INSTANCE VARIABLES
        public id:string;
        public src: string;
        // CONSTRUCTOR +++++++++++++++++++++
        constructor(id:string, src:string) {
            this.id = id;
            this.src = src;
        }
    }
}