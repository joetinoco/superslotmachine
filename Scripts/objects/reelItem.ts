module objects {
    // REELITEM CLASS ++++++++++++++++++++++++++
    //
    // Represents a position of the reel, with an assigned image ("fruit") or a blank.
    //
    export class ReelItem extends createjs.Bitmap {
        //PUBLIC INSTANCE VARIABLES
        public itemName: string;
        // CONSTRUCTOR +++++++++++++++++++++
        constructor(pathString:string, x:number, y: number) {
            super(assets.getResult(pathString));
            this.itemName = pathString;
            this.x = x;
            this.y = y;
        }

    }
} 