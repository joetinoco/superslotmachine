module objects {
    // ReelSet Class
    // +++++++++++++
    //
    // A set of three reels 
    //
    export class ReelSet extends objects.Scene {
        //PUBLIC INSTANCE VARIABLES +++++++++++++
        public reelsMoving: boolean;
        
        //PRIVATE INSTANCE VARIABLES ++++++++++++
        private _reelReset: createjs.Bitmap;
        private _reelMask: createjs.Bitmap;
        private _reel1: objects.ReelItem[];
        private _reel2: objects.ReelItem[];
        private _reel3: objects.ReelItem[];
        private _reelMoving: boolean[];
        private _reelSpinTimes: number[];

        private _spinningSound: objects.Sound;
        private _stoppingSound: objects.Sound;
        private _jackpotSound: objects.Sound;
        private _winSound: objects.Sound;
        private _bigWinSound: objects.Sound;
        private _loseSound: objects.Sound;
        
        // STATIC PROPERTIES
        static reelItems = ['Blank', 'Fruit', 'Mushroom', 'Coin', 'Yoshi', 'Mario', 'Star'];
        static reelXcoords = [38, 91, 144];
        static reelYcoords = [49, 87, 125];
        static defaultSpinTime: number = 600; // in miliseconds
        
        // CONSTRUCTOR ++++++++++++++++++++++
        constructor() {
            super();
        }
        
        // PUBLIC METHODS +++++++++++++++++++++
        
        // Start Method
        public start(): void {
            // prepare reel refresh elements
            this._reelReset = new createjs.Bitmap(assets.getResult('ReelReset'));
            this._reelMask = new createjs.Bitmap(assets.getResult('ReelMask'));
            this._reelSpinTimes = new Array();
            this._reelMoving = new Array();
            
            // Spinning/stopping sounds
            this._spinningSound = new objects.Sound('SpinningSound');
            this._stoppingSound = new objects.Sound('StoppingSound');
            
            // Winning/losing sounds
            this._jackpotSound = new objects.Sound('JackpotSound');
            this._bigWinSound = new objects.Sound('BigWinSound');
            this._winSound = new objects.Sound('WinSound');
            this._loseSound = new objects.Sound('LoseSound');
        }
        
        // Redraw scene and update elements
        public update(event: createjs.Event): void {
            var reelsMoving: boolean = false;
            
            // redraw reel background
            this.addChild(this._reelReset);
            
            // redraw reels
            if (this._reelMoving[0]) {
                this.reelsMoving = true;
                this._animateReel(0, event);
            } else {
                for (var i: number = 0; i < 3; i++)
                    this.addChild(this._reel1[i]);
            }

            if (this._reelMoving[1]) {
                this.reelsMoving = true;
                this._animateReel(1, event);
            } else {
                for (var i: number = 0; i < 3; i++)
                    this.addChild(this._reel2[i]);
            }

            if (this._reelMoving[2]) {
                this.reelsMoving = true;
                this._animateReel(2, event);
            } else {
                for (var i: number = 0; i < 3; i++)
                    this.addChild(this._reel3[i]);
            }
            
            // redraw reel mask
            this.addChild(this._reelMask);

        }
        
        // Reset reels
        public resetReel(): void {
            console.log('Resetting reel');
            this._reel1 = new Array();
            this._reel2 = new Array();
            this._reel3 = new Array();
            this._reelMoving[0] = false;
            this._reelMoving[1] = false;
            this._reelMoving[2] = false;
            this._reelSpinTimes[0] = ReelSet.defaultSpinTime;
            this._reelSpinTimes[1] = ReelSet.defaultSpinTime * 2;
            this._reelSpinTimes[2] = ReelSet.defaultSpinTime * 3;
        }
        
        // Return the betline
        public betLine(): string[] {
            return [
                this._reel1[1].itemName,
                this._reel2[1].itemName,
                this._reel3[1].itemName,
            ];
        }
        
        // PRIVATE METHODS +++++++++++++++++++
        
        // Get a random reel item
        private _getRandomReelItem(): string {
            return ReelSet.reelItems[Math.floor(Math.random() * ReelSet.reelItems.length)];
        }
        
        // Display a spinning reel animation
        private _animateReel(r: number, event: createjs.Event) {
            var delta: number = Math.round(event.delta);
            this._reelSpinTimes[r] -= delta;
            
            // Check if the wheel span for long enough
            if (this._reelSpinTimes[r] <= 0) {
                this._reelMoving[r] = false;
                // Play stopping sound (reels 1 and 2 only)
                if (r != 2) this._stoppingSound.play();
                this._reelSpinTimes[r] = ReelSet.defaultSpinTime * (r + 1);
            } else {
                // Determine which frame to display for the animation
                // based on the remaining time.
                var frame: number;
                frame = Math.round(
                    (this._reelSpinTimes[r] /
                        (ReelSet.defaultSpinTime / 15)) % 2 + 1
                );
                var spinFrame = new objects.ReelItem("Spin" + frame,
                    ReelSet.reelXcoords[r],
                    ReelSet.reelYcoords[0] + 18);
                this.addChild(spinFrame);
            }
            
            // If all reels stopped, stop spinning audio
            if (this._reelMoving[0] === false &&
                this._reelMoving[1] === false &&
                this._reelMoving[2] === false) {
                this.reelsMoving = false;
                this._spinningSound.stop();
            }
        }

    }

}