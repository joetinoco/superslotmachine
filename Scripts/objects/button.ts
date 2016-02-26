module objects {
    export class Button extends createjs.Bitmap {
        // BUTTON CLASS +++++++++++++++++++++
        //
        // Implements all types of buttons on the user interface
        //
        
        //PUBLIC INSTANCE VARIABLES
        public enabled: boolean;
        
        //CONSTRUCTOR
        constructor(pathString:string, x:number, y: number, public isCentered: boolean) {
            super(assets.getResult(pathString));
            this.x = x;
            this.y = y;
            
            // Center a button around the X/Y coords
            if (this.isCentered){
                this.regX = this.getBounds().width * 0.5;
                this.regY = this.getBounds().height * 0.5;
            } 

            // Apply a simple mouseover effect
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
        
        // Enable/disable a button
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