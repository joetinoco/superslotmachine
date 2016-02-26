var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objects;
(function (objects) {
    // REELSET CLASS +++++++++++++++++++++++++
    //
    // A set of three animated reels 
    //
    var ReelSet = (function (_super) {
        __extends(ReelSet, _super);
        // CONSTRUCTOR ++++++++++++++++++++++
        function ReelSet() {
            _super.call(this);
        }
        // PUBLIC METHODS +++++++++++++++++++++
        // Start Method
        ReelSet.prototype.start = function () {
            // prepare reel refresh elements
            this._reelReset = new createjs.Bitmap(assets.getResult('ReelReset'));
            this._reelMask = new createjs.Bitmap(assets.getResult('ReelMask'));
            this._reelSpinTimes = new Array();
            this._reelMoving = new Array();
            // Spinning/stopping sounds
            this._spinningSound = new objects.Sound('SpinningSound');
            this._stoppingSound = new objects.Sound('StoppingSound');
        };
        // Make the reels start spinning
        ReelSet.prototype.spinReels = function () {
            // Randomize all three reel results in all positions    
            for (var i = 0; i < 3; i++) {
                this._reel1[i] = new objects.ReelItem(this._getRandomReelItem(), ReelSet.reelXcoords[0], ReelSet.reelYcoords[i]);
                this._reel2[i] = new objects.ReelItem(this._getRandomReelItem(), ReelSet.reelXcoords[1], ReelSet.reelYcoords[i]);
                this._reel3[i] = new objects.ReelItem(this._getRandomReelItem(), ReelSet.reelXcoords[2], ReelSet.reelYcoords[i]);
                this.addChild(this._reel1[i]);
                this.addChild(this._reel2[i]);
                this.addChild(this._reel3[i]);
            }
            // Trigger the wheel motion animation and SFX
            this._reelMoving[0] = true;
            this._reelMoving[1] = true;
            this._reelMoving[2] = true;
            this._spinningSound.play(-1); // -1 means loop indefinitely 
        };
        // Redraw scene and update elements
        ReelSet.prototype.update = function (event) {
            this.removeAllChildren();
            // redraw reel background
            this.addChild(this._reelReset);
            // redraw reels
            if (this._reelMoving[0]) {
                this.reelsMoving = true;
                this._animateReel(0, event);
            }
            else {
                for (var i = 0; i < 3; i++)
                    this.addChild(this._reel1[i]);
            }
            if (this._reelMoving[1]) {
                this.reelsMoving = true;
                this._animateReel(1, event);
            }
            else {
                for (var i = 0; i < 3; i++)
                    this.addChild(this._reel2[i]);
            }
            if (this._reelMoving[2]) {
                this.reelsMoving = true;
                this._animateReel(2, event);
            }
            else {
                for (var i = 0; i < 3; i++)
                    this.addChild(this._reel3[i]);
            }
            // redraw reel mask
            this.addChild(this._reelMask);
        };
        // Reset reels
        ReelSet.prototype.resetReels = function () {
            console.log('Resetting reels');
            this._reel1 = new Array();
            this._reel2 = new Array();
            this._reel3 = new Array();
            this._reelMoving[0] = false;
            this._reelMoving[1] = false;
            this._reelMoving[2] = false;
            this._reelSpinTimes[0] = ReelSet.defaultSpinTime;
            this._reelSpinTimes[1] = ReelSet.defaultSpinTime * 2;
            this._reelSpinTimes[2] = ReelSet.defaultSpinTime * 3;
        };
        // Return the current betline
        ReelSet.prototype.betLine = function () {
            return [
                this._reel1[1].itemName,
                this._reel2[1].itemName,
                this._reel3[1].itemName,
            ];
        };
        // PRIVATE METHODS +++++++++++++++++++
        // Get a random item for a reel position
        ReelSet.prototype._getRandomReelItem = function () {
            return ReelSet.reelItems[Math.floor(Math.random() * ReelSet.reelItems.length)];
        };
        // Display a spinning reel animation
        ReelSet.prototype._animateReel = function (r, event) {
            var delta = Math.round(event.delta);
            this._reelSpinTimes[r] -= delta;
            // Check if the wheel span for long enough
            if (this._reelSpinTimes[r] <= 0) {
                this._reelMoving[r] = false;
                // Play stopping sound
                // (reels 1 and 2 only, so as not to overlap with the reel result sound)
                if (r != 2)
                    this._stoppingSound.play();
                this._reelSpinTimes[r] = ReelSet.defaultSpinTime * (r + 1);
            }
            else {
                // Determine which frame to display for the animation,
                // based on the remaining time.
                var frame;
                frame = Math.round((this._reelSpinTimes[r] /
                    (ReelSet.defaultSpinTime / 15)) % 2 + 1);
                var spinFrame = new objects.ReelItem("Spin" + frame, ReelSet.reelXcoords[r], ReelSet.reelYcoords[0] + 18);
                this.addChild(spinFrame);
            }
            // If all reels stopped...
            if (this._reelMoving[0] === false &&
                this._reelMoving[1] === false &&
                this._reelMoving[2] === false) {
                // Stop audio
                this.reelsMoving = false;
                this._spinningSound.stop();
                // Trigger the spin finish event
                this.dispatchEvent("spinComplete");
            }
        };
        // STATIC PROPERTIES
        ReelSet.reelItems = ['Blank', 'Fruit', 'Mushroom', 'Coin', 'Yoshi', 'Mario', 'Star'];
        ReelSet.reelXcoords = [38, 91, 144];
        ReelSet.reelYcoords = [49, 87, 125];
        ReelSet.defaultSpinTime = 600; // in miliseconds
        return ReelSet;
    })(objects.Scene);
    objects.ReelSet = ReelSet;
})(objects || (objects = {}));
//# sourceMappingURL=reelSet.js.map