module objects {
    // SCENE CLASS ++++++++++++++++++++++++++++++
    //
    // Represents a game scene as a CreateJS container
    //
    export class Scene extends createjs.Container {
        // CONSTRUCTOR +++++++++++++++++++++++++++++
        constructor() {
            super();
            this.start();
        }
        
        // Add game objects to my scene in this method
        public start():void {
            stage.addChild(this);
        }
        
        // update game objects in my scene
        public update(event: createjs.Event):void {
            
        }
    }
}