module objects {
    export class ReelItem extends createjs.Bitmap {
        public itemName: string;
        //CONSTRUCTOR
        constructor(pathString:string, x:number, y: number) {
            super(assets.getResult(pathString));
            this.itemName = pathString;
            this.x = x;
            this.y = y;
        }

    }
} 