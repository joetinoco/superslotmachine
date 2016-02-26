module objects {
    // LABEL CLASS ++++++++++++++++++++++++++++++++++++++++++++++
    //
    // Used to display text labels on screen.
    // The font used is usually 'Press Start P2', from Google Fonts.
    //
    export class Label extends createjs.Text {
        // CONSTRUCTOR METHOD +++++++++++++++++++++++++++++++++++
        constructor(labelString: string, labelFont: string, labelColour: string, x: number, y: number, centered: boolean = true) {
            super(labelString, labelFont, labelColour);
            
            // Center the label on request
            if (centered){
                this.regX = this.getBounds().width * 0.5;
                this.regY = this.getBounds().height * 0.5;
            }
            this.x = x;
            this.y = y;
        }
    }
} 