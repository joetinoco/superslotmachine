var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
            // Set the scene background image (the machine itself)
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
            // Winning/losing sounds
            this._jackpotSound = new objects.Sound('JackpotSound');
            this._bigWinSound = new objects.Sound('BigWinSound');
            this._winSound = new objects.Sound('WinSound');
            this._loseSound = new objects.Sound('LoseSound');
            // Reels
            this._reels = new objects.ReelSet();
            // Event handler for when the reels stop spinning
            this._reels.on('spinComplete', this._calculateEarnings, this);
            // Prepare gameplay: first, reset the entire game
            this._resetGame();
            // reset labels
            this._updateLabels();
            // add this scene to the global stage container
            stage.addChild(this);
        };
        // Redraw scene and update elements
        SlotMachine.prototype.update = function (event) {
            this.removeAllChildren();
            // Redraw BG and buttons
            this.addChild(this._backgroundImage);
            this.addChild(this._bet1Button);
            this.addChild(this._bet2Button);
            this.addChild(this._bet3Button);
            this.addChild(this._spinButton);
            this.addChild(this._resetButton);
            this.addChild(this._quitButton);
            // Update reel set
            this.addChild(this._reels);
            this._reels.update(event);
            // Redraw labels
            this.addChild(this._moneyLabel);
            this.addChild(this._betsLabel);
            this.addChild(this._winsLabel);
            // Update screen elements
            if (this._reels.reelsMoving) {
                this._disableBetButtons();
            }
            else
                this._updateBetButtons();
            // Update screen labels
            this._updateLabels();
        };
        // PRIVATE METHODS +++++++++++++++++++
        // Reset all game parameters
        SlotMachine.prototype._resetGame = function () {
            console.log('Resetting game');
            // Reset reels
            this._reels.resetReels();
            // Reset button statuses
            this._bet1Button.enableButton();
            this._bet2Button.enableButton();
            this._bet3Button.enableButton();
            this._spinButton.disableButton(); // User must bet first
            // Reset game parameters
            this._money = SlotMachine.startingPlayerAmount;
            this._bets = 0;
            this._betAmount = 0;
            this._wins = 0;
        };
        // update labels for money, bets, etc.
        SlotMachine.prototype._updateLabels = function () {
            // Player money label
            this._moneyLabel = new objects.Label(this._money.toString(), "13px 'Press Start 2P'", "#FFFFFF", 13, 17, false);
            // Bets label
            this._betsLabel = new objects.Label(this._bets.toString(), "13px 'Press Start 2P'", "#FFFFFF", 94, 17, false);
            // Player wins counter label
            this._winsLabel = new objects.Label(this._wins.toString(), "13px 'Press Start 2P'", "#FFFFFF", 145, 17, false);
        };
        // Update button status according to player money
        SlotMachine.prototype._updateBetButtons = function () {
            // Player can't bet 3 if he does not have 3 credits
            if (this._money < 3) {
                this._bet3Button.disableButton();
            }
            else {
                this._bet3Button.enableButton();
            }
            // Same thing for "Bet 2" and "Bet 1"
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
        // Disable all buttons (for when the reels are spinning)
        SlotMachine.prototype._disableBetButtons = function () {
            this._bet3Button.disableButton();
            this._bet2Button.disableButton();
            this._bet1Button.disableButton();
            this._spinButton.disableButton();
        };
        // Place a bet
        SlotMachine.prototype._placeBet = function (amount) {
            // Check if the user has the bet amount
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
                // Set up the bet amount in the machine
                this._betAmount = amount;
                // Subtract the bet from the player money
                this._money -= amount;
            }
        };
        // EVENT HANDLERS +++++++++++++++
        // Calculate earnings (if any)
        SlotMachine.prototype._calculateEarnings = function () {
            var bet = this._betAmount;
            var earnings = 0;
            // 'Collect' the player money
            this._betAmount = 0;
            // Get the bet line result from the reels object
            var betline = this._reels.betLine();
            // Calculate results. 
            // First, score sequences of same figures in the three reels
            if (betline[0] === betline[1] && betline[1] === betline[2]) {
                switch (betline[0]) {
                    case 'Blank':
                        earnings = 0;
                        break;
                    case 'Coin':
                        earnings = 10 * bet;
                        break;
                    case 'Mushroom':
                        earnings = 15 * bet;
                        break;
                    case 'Fruit':
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
                // Score the amount of single coins, if any
                for (var i = 0; i < 3; i++) {
                    if (betline[i] === 'Coin') {
                        if (earnings === 0)
                            earnings = 2 * bet;
                        else
                            earnings = 5 * bet;
                    }
                }
            }
            // Play corresponding sounds
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
        // BUTTON EVENT HANDLERS
        // Bet buttons: play a sound and place the corresponding bet
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
        // "Spin" button
        SlotMachine.prototype._spinButtonClick = function (event) {
            if (this._spinButton.enabled) {
                this._reels.spinReels();
            }
        };
        // "Reset" button
        SlotMachine.prototype._resetButtonClick = function (event) {
            // Prevents activation if the reels are spinning
            // (otherwise the spin sound won't ever stop)
            if (!this._reels.reelsMoving) {
                this._betButtonSound.play();
                this._resetGame();
            }
        };
        // "Quit" button
        SlotMachine.prototype._quitButtonClick = function (event) {
            // Prevents activation if the reels are spinning
            // (otherwise the spin sound won't ever stop)
            if (!this._reels.reelsMoving) {
                this._betButtonSound.play();
                // Switch to the GAME OVER Scene
                scene = config.Scene.GAME_OVER;
                changeScene();
            }
        };
        // STATIC PROPERTIES
        SlotMachine.jackpotAmount = 1500;
        SlotMachine.startingPlayerAmount = 30;
        return SlotMachine;
    })(objects.Scene);
    scenes.SlotMachine = SlotMachine;
})(scenes || (scenes = {}));
//# sourceMappingURL=slotmachine.js.map