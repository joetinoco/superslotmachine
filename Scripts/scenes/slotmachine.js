var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// SLOT_MACHINE SCENE
var scenes;
(function (scenes) {
    var SlotMachine = (function (_super) {
        __extends(SlotMachine, _super);
        // CONSTRUCTOR ++++++++++++++++++++++
        function SlotMachine() {
            _super.call(this);
        }
        // PUBLIC METHODS +++++++++++++++++++++
        // Start Method
        SlotMachine.prototype.start = function () {
            this._backgroundImage = new createjs.Bitmap(assets.getResult('SlotMachine'));
            // Bet buttons
            this._bet1Button = new objects.Button("Bet1Button", 15, 195, false);
            this._bet1Button.on('click', this._bet1ButtonClick, this);
            this._bet2Button = new objects.Button("Bet2Button", 57, 195, false);
            this._bet2Button.on('click', this._bet2ButtonClick, this);
            this._bet3Button = new objects.Button("Bet3Button", 99, 195, false);
            this._bet3Button.on('click', this._bet3ButtonClick, this);
            this._betButtonSound = new objects.Sound('BetButtonSound');
            // Spin button
            this._spinButton = new objects.Button("SpinButton", 159, 195, false);
            this._spinButton.on('click', this._spinButtonClick, this);
            // Reset button
            this._resetButton = new objects.Button("ResetButton", 216, 218, false);
            this._resetButton.on('click', this._resetButtonClick, this);
            // Quit button            
            this._quitButton = new objects.Button("QuitButton", 264, 218, false);
            this._quitButton.on('click', this._quitButtonClick, this);
            // Spinning/stopping sounds
            this._spinningSound = new objects.Sound('SpinningSound');
            this._stoppingSound = new objects.Sound('StoppingSound');
            // Winning/losing sounds
            this._jackpotSound = new objects.Sound('JackpotSound');
            this._bigWinSound = new objects.Sound('BigWinSound');
            this._winSound = new objects.Sound('WinSound');
            this._loseSound = new objects.Sound('LoseSound');
            // prepare reel refresh elements
            this._reelReset = new createjs.Bitmap(assets.getResult('ReelReset'));
            this._reelMask = new createjs.Bitmap(assets.getResult('ReelMask'));
            this._reelSpinTimes = new Array();
            this._reelMoving = new Array();
            // reset entire game
            this._resetGame();
            // reset labels
            this._updateLabels();
            // add this scene to the global stage container
            stage.addChild(this);
        };
        // Redraw scene and update elements
        SlotMachine.prototype.update = function (event) {
            var reelsMoving = false;
            this.removeAllChildren();
            // redraw BG and buttons
            this.addChild(this._backgroundImage);
            this.addChild(this._bet1Button);
            this.addChild(this._bet2Button);
            this.addChild(this._bet3Button);
            this.addChild(this._spinButton);
            this.addChild(this._resetButton);
            this.addChild(this._quitButton);
            this.addChild(this._reelReset);
            // redraw reels
            if (this._reelMoving[0]) {
                reelsMoving = true;
                this._animateReel(0, event);
            }
            else {
                for (var i = 0; i < 3; i++)
                    this.addChild(this._reel1[i]);
            }
            if (this._reelMoving[1]) {
                reelsMoving = true;
                this._animateReel(1, event);
            }
            else {
                for (var i = 0; i < 3; i++)
                    this.addChild(this._reel2[i]);
            }
            if (this._reelMoving[2]) {
                reelsMoving = true;
                this._animateReel(2, event);
            }
            else {
                for (var i = 0; i < 3; i++)
                    this.addChild(this._reel3[i]);
            }
            this.addChild(this._reelMask);
            // redraw labels
            this.addChild(this._moneyLabel);
            this.addChild(this._betsLabel);
            this.addChild(this._winsLabel);
            // Update screen elements
            if (reelsMoving) {
                this._disableBetButtons();
            }
            else
                this._updateBetButtons();
            this._updateLabels();
        };
        // PRIVATE METHODS +++++++++++++++++++
        // Reset game
        SlotMachine.prototype._resetGame = function () {
            console.log('Resetting game');
            this._reel1 = new Array();
            this._reel2 = new Array();
            this._reel3 = new Array();
            this._reelMoving[0] = false;
            this._reelMoving[1] = false;
            this._reelMoving[2] = false;
            this._reelSpinTimes[0] = SlotMachine.defaultSpinTime;
            this._reelSpinTimes[1] = SlotMachine.defaultSpinTime * 2;
            this._reelSpinTimes[2] = SlotMachine.defaultSpinTime * 3;
            this._bet1Button.enableButton();
            this._bet2Button.enableButton();
            this._bet3Button.enableButton();
            this._spinButton.disableButton(); // User must bet first
            this._money = SlotMachine.startingPlayerAmount;
            this._bets = 0;
            this._betAmount = 0;
            this._wins = 0;
        };
        // Display a spinning reel animation
        SlotMachine.prototype._animateReel = function (r, event) {
            var delta = Math.round(event.delta);
            this._reelSpinTimes[r] -= delta;
            // Check if the wheel span for long enough
            if (this._reelSpinTimes[r] <= 0) {
                this._reelMoving[r] = false;
                // Play stopping sound (reels 1 and 2 only)
                if (r != 2)
                    this._stoppingSound.play();
                this._reelSpinTimes[r] = SlotMachine.defaultSpinTime * (r + 1);
            }
            else {
                // Determine which frame to display for the animation
                // based on the remaining time.
                var frame;
                frame = Math.round((this._reelSpinTimes[r] /
                    (SlotMachine.defaultSpinTime / 15)) % 2 + 1);
                var spinFrame = new objects.ReelItem("Spin" + frame, SlotMachine.reelXcoords[r], SlotMachine.reelYcoords[0] + 18);
                this.addChild(spinFrame);
            }
            // If all reels stopped, stop spinning audio and calculate earnings.
            if (this._reelMoving[0] === false &&
                this._reelMoving[1] === false &&
                this._reelMoving[2] === false) {
                this._spinningSound.stop();
                this._calculateEarnings();
            }
        };
        // update labels for money, bets, etc.
        SlotMachine.prototype._updateLabels = function () {
            this._moneyLabel = new objects.Label(this._money.toString(), "13px 'Press Start 2P'", "#FFFFFF", 13, 17, false);
            this._betsLabel = new objects.Label(this._bets.toString(), "13px 'Press Start 2P'", "#FFFFFF", 94, 17, false);
            this._winsLabel = new objects.Label(this._wins.toString(), "13px 'Press Start 2P'", "#FFFFFF", 145, 17, false);
        };
        // Update bet button status according to player money
        SlotMachine.prototype._updateBetButtons = function () {
            if (this._money < 3) {
                this._bet3Button.disableButton();
            }
            else {
                this._bet3Button.enableButton();
            }
            if (this._money < 2) {
                this._bet2Button.disableButton();
            }
            else {
                this._bet2Button.enableButton();
            }
            if (this._money < 1) {
                this._bet1Button.disableButton();
            }
            else {
                this._bet1Button.enableButton();
            }
            // Enable the 'spin' button only after a bet is placed.
            if (this._betAmount === 0) {
                this._spinButton.disableButton();
            }
            else {
                this._spinButton.enableButton();
            }
        };
        // Disable all buttons (used when the reels are spinning)
        SlotMachine.prototype._disableBetButtons = function () {
            this._bet3Button.disableButton();
            this._bet2Button.disableButton();
            this._bet1Button.disableButton();
            this._spinButton.disableButton();
        };
        // Place a bet
        SlotMachine.prototype._placeBet = function (amount) {
            if (this._money >= amount) {
                if (this._betAmount === 0) {
                    // Count this bet
                    this._bets++;
                }
                else {
                    // 'Reimburses' the previous bet before placing a new one
                    // (for when the user clicks 'bet 1', then 'bet 2' instead)
                    this._money += this._betAmount;
                }
                this._betAmount = amount;
                this._money -= amount;
            }
        };
        // Calculate earnings (if any)
        SlotMachine.prototype._calculateEarnings = function () {
            var bet = this._betAmount;
            var earnings = 0;
            // 'Spend' the player money
            this._betAmount = 0;
            // Separate the betline in an array
            var betline = [
                this._reel1[1].itemName,
                this._reel2[1].itemName,
                this._reel3[1].itemName,
            ];
            // Scores sequences of same figures
            if (betline[0] === betline[1] && betline[1] === betline[2]) {
                switch (betline[0]) {
                    case 'Blank':
                        earnings = 0;
                        break;
                    case 'Fruit':
                        earnings = 10 * bet;
                        break;
                    case 'Mushroom':
                        earnings = 15 * bet;
                        break;
                    case 'Coin':
                        earnings = 20 * bet;
                        break;
                    case 'Yoshi':
                        earnings = 50 * bet;
                        break;
                    case 'Mario':
                        earnings = 100 * bet;
                        break;
                    case 'Star':
                        earnings = 500 * bet;
                        break;
                }
            }
            else {
                // Scores the amount of single fruits, if any
                for (var i = 0; i < 3; i++) {
                    if (betline[i] === 'Fruit') {
                        if (earnings === 0)
                            earnings = 2 * bet;
                        else
                            earnings = 5 * bet;
                    }
                }
            }
            // Play SFX
            if (earnings === SlotMachine.jackpotAmount) {
                // User won the jackpot
                console.log('JACKPOT');
                this._jackpotSound.play();
                this._wins++;
            }
            else if (earnings > 20) {
                // User won big
                console.log('User won ' + earnings);
                this._bigWinSound.play();
                this._wins++;
            }
            else if (earnings > 0) {
                // User won
                console.log('User won ' + earnings);
                this._winSound.play();
                this._wins++;
            }
            else {
                // User did not win
                console.log('No win');
                this._loseSound.play();
            }
            // Pay back user
            this._money += earnings;
        };
        // Get a random reel item
        SlotMachine.prototype._getRandomReelItem = function () {
            return SlotMachine.reelItems[Math.floor(Math.random() * SlotMachine.reelItems.length)];
        };
        // EVENT HANDLERS +++++++++++++++
        SlotMachine.prototype._bet1ButtonClick = function (event) {
            if (this._bet1Button.enabled) {
                this._betButtonSound.play();
                this._placeBet(1);
            }
        };
        SlotMachine.prototype._bet2ButtonClick = function (event) {
            if (this._bet2Button.enabled) {
                this._betButtonSound.play();
                this._placeBet(2);
            }
        };
        SlotMachine.prototype._bet3ButtonClick = function (event) {
            if (this._bet3Button.enabled) {
                this._betButtonSound.play();
                this._placeBet(3);
            }
        };
        SlotMachine.prototype._spinButtonClick = function (event) {
            if (this._spinButton.enabled) {
                // Randomize all three reel results in all positions    
                for (var i = 0; i < 3; i++) {
                    this._reel1[i] = new objects.ReelItem(this._getRandomReelItem(), SlotMachine.reelXcoords[0], SlotMachine.reelYcoords[i]);
                    this._reel2[i] = new objects.ReelItem(this._getRandomReelItem(), SlotMachine.reelXcoords[1], SlotMachine.reelYcoords[i]);
                    this._reel3[i] = new objects.ReelItem(this._getRandomReelItem(), SlotMachine.reelXcoords[2], SlotMachine.reelYcoords[i]);
                    this.addChild(this._reel1[i]);
                    this.addChild(this._reel2[i]);
                    this.addChild(this._reel3[i]);
                }
                // Trigger the wheel motion animation and SFX
                this._reelMoving[0] = true;
                this._reelMoving[1] = true;
                this._reelMoving[2] = true;
                this._spinningSound.play(-1); // -1 means loop indefinitely 
            }
        };
        SlotMachine.prototype._resetButtonClick = function (event) {
            this._betButtonSound.play();
            this._resetGame();
        };
        SlotMachine.prototype._quitButtonClick = function (event) {
            this._betButtonSound.play();
            // Switch to the GAME OVER Scene
            scene = config.Scene.GAME_OVER;
            changeScene();
        };
        // STATIC PROPERTIES
        SlotMachine.reelItems = ['Blank', 'Fruit', 'Mushroom', 'Coin', 'Yoshi', 'Mario', 'Star'];
        SlotMachine.reelXcoords = [38, 91, 144];
        SlotMachine.reelYcoords = [49, 87, 125];
        SlotMachine.jackpotAmount = 1500;
        SlotMachine.startingPlayerAmount = 30;
        SlotMachine.defaultSpinTime = 600; // in miliseconds
        return SlotMachine;
    })(objects.Scene);
    scenes.SlotMachine = SlotMachine;
})(scenes || (scenes = {}));
//# sourceMappingURL=slotmachine.js.map