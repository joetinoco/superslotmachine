module objects {
    export class Button extends createjs.Bitmap {
        //PUBLIC INSTANCE VARIABLES
        public enabled: boolean;
        
        //CONSTRUCTOR
        constructor(pathString:string, x:number, y: number, public isCentered: boolean) {
            super(assets.getResult(pathString));
            this.x = x;
            this.y = y; 

            this.on("mouseover", this.overButton, this);
            this.on("mouseout", this.outButton, this);
            this.enabled = true;
        }

        // PRIVATE METHODS
        // Event Handler for mouse over
        overButton(event: createjs.MouseEvent): void {
            if (this.enabled){
                event.currentTarget.alpha = 0.7;
            } else event.currentTarget.alpha = 0.3;
                
        }

        // Event Handler for mouse out
        outButton(event: createjs.MouseEvent): void {
            if (this.enabled){
                event.currentTarget.alpha = 1.0;
            } else event.currentTarget.alpha = 0.3;
        }
        
        // Enables/disables a button
        public disableButton(): void {
          this.alpha = 0.3;
          this.enabled = false;
        }

        public enableButton(): void {
          this.alpha = 1.0;
          this.enabled = true;
        }


    }
} 