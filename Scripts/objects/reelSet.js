var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objects;
(function (objects) {
    // ReelSet Class
    // +++++++++++++
    //
    // A set of three reels 
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
            // Winning/losing sounds
            this._jackpotSound = new objects.Sound('JackpotSound');
            this._bigWinSound = new objects.Sound('BigWinSound');
            this._winSound = new objects.Sound('WinSound');
            this._loseSound = new objects.Sound('LoseSound');
        };
        // Redraw scene and update elements
        ReelSet.prototype.update = function (event) {
            var reelsMoving = false;
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
        ReelSet.prototype.resetReel = function () {
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
        };
        // Return the betline
        ReelSet.prototype.betLine = function () {
            return [
                this._reel1[1].itemName,
                this._reel2[1].itemName,
                this._reel3[1].itemName,
            ];
        };
        // PRIVATE METHODS +++++++++++++++++++
        // Get a random reel item
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
                // Play stopping sound (reels 1 and 2 only)
                if (r != 2)
                    this._stoppingSound.play();
                this._reelSpinTimes[r] = ReelSet.defaultSpinTime * (r + 1);
            }
            else {
                // Determine which frame to display for the animation
                // based on the remaining time.
                var frame;
                frame = Math.round((this._reelSpinTimes[r] /
                    (ReelSet.defaultSpinTime / 15)) % 2 + 1);
                var spinFrame = new objects.ReelItem("Spin" + frame, ReelSet.reelXcoords[r], ReelSet.reelYcoords[0] + 18);
                this.addChild(spinFrame);
            }
            // If all reels stopped, stop spinning audio
            if (this._reelMoving[0] === false &&
                this._reelMoving[1] === false &&
                this._reelMoving[2] === false) {
                this.reelsMoving = false;
                this._spinningSound.stop();
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