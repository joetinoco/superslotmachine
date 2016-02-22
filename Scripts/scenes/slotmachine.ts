// SLOT_MACHINE SCENE
module scenes {
    export class SlotMachine extends objects.Scene {
        //PRIVATE INSTANCE VARIABLES ++++++++++++
        private _backgroundImage: createjs.Bitmap;
        private _bet1Button: objects.Button;
        private _bet2Button: objects.Button;
        private _bet3Button: objects.Button;
        private _spinButton: objects.Button;
        private _resetButton: objects.Button;
        private _quitButton: objects.Button;
        private _moneyLabel: objects.Label;
        private _betsLabel: objects.Label;
        private _winsLabel: objects.Label;
        
        private _betButtonSound: objects.Sound;
        private _jackpotSound: objects.Sound;
        private _winSound: objects.Sound;
        private _bigWinSound: objects.Sound;
        private _loseSound: objects.Sound;
        
        private _reelReset: createjs.Bitmap;
        private _reelMask: createjs.Bitmap;
        private _reel1: objects.ReelItem[];
        private _reel2: objects.ReelItem[];
        private _reel3: objects.ReelItem[];
        
        private _money: number;
        private _bets: number;
        private _betAmount: number;
        private _wins: number;
        
        
        // STATIC PROPERTIES
        static reelItems = ['Blank', 'Fruit', 'Mushroom', 'Coin', 'Yoshi', 'Mario', 'Star'];
        static reelXcoords = [38, 91, 144];
        static reelYcoords = [49, 87, 125]; 
        static jackpotAmount: number = 1500;
        static startingPlayerAmount: number = 30;
        
        // CONSTRUCTOR ++++++++++++++++++++++
        constructor() {
            super();

        }
        
        // PUBLIC METHODS +++++++++++++++++++++
        
        // Start Method
        public start(): void {
            
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
            
            // prepare reel refresh elements
            this._reelReset = new createjs.Bitmap(assets.getResult('ReelReset'));
            this._reelMask = new createjs.Bitmap(assets.getResult('ReelMask'));
            
            // reset entire game
            this._resetGame();
            
            // reset labels
            this._updateLabels();
            
            // add this scene to the global stage container
            stage.addChild(this);
            
        }

        // Redraw scene and update elements
        public update(): void {
            
            this.removeAllChildren();
            
            // redraw BG and buttons
            this.addChild(this._backgroundImage);
            this.addChild(this._bet1Button);
            this.addChild(this._bet2Button);
            this.addChild(this._bet3Button);
            this.addChild(this._spinButton);
            this.addChild(this._resetButton); 
            this.addChild(this._quitButton);

            // redraw reel
            this.addChild(this._reelReset);
            for(var i:number = 0; i < 3; i++){
                this.addChild(this._reel1[i]);
                this.addChild(this._reel2[i]);
                this.addChild(this._reel3[i]);
            }
            this.addChild(this._reelMask);
            
            // redraw labels
            this.addChild(this._moneyLabel);
            this.addChild(this._betsLabel);
            this.addChild(this._winsLabel);
            
            // Update screen elements
            this._updateBetButtons();
            this._updateLabels();
            
        }
        
        // PRIVATE METHODS +++++++++++++++++++
        
        // Reset game
        private _resetGame(): void{
            console.log('Resetting game');
            this._reel1 = new Array();
            this._reel2 = new Array();
            this._reel3 = new Array();
            this._bet1Button.enableButton();
            this._bet2Button.enableButton();
            this._bet3Button.enableButton();
            this._spinButton.disableButton(); // User must bet first
            this._money = SlotMachine.startingPlayerAmount;
            this._bets = 0;
            this._betAmount = 0;
            this._wins = 0;
        }
        
        // update labels for money, bets, etc.
        private _updateLabels(){
            this._moneyLabel = new objects.Label(
                this._money.toString(),
                "13px 'Press Start 2P'",
                "#FFFFFF",
                13, 17, false);
            this._betsLabel = new objects.Label(
                this._bets.toString(),
                "13px 'Press Start 2P'",
                "#FFFFFF",
                94, 17, false);
            this._winsLabel = new objects.Label(
                this._wins.toString(),
                "13px 'Press Start 2P'",
                "#FFFFFF",
                145, 17, false);
        }
        
        // Update bet button status according to player money
        private _updateBetButtons(){
            if (this._money < 3){
                this._bet3Button.disableButton();
            } else {
                this._bet3Button.enableButton();
            }
            
            if (this._money < 2){
                this._bet2Button.disableButton();
            } else {
                this._bet2Button.enableButton();
            }
            
            if (this._money < 1){
                this._bet1Button.disableButton();
            } else {
                this._bet1Button.enableButton();
            }
            
            // Enable the 'spin' button only after a bet is placed.
            if (this._betAmount === 0){
                this._spinButton.disableButton();
            } else {
                this._spinButton.enableButton();
            }
        }
        
        // Place a bet
        private _placeBet(amount: number): void {
            if (this._money >= amount){
                if (this._betAmount === 0){
                    // Count this bet
                    this._bets++;
                } else {
                    // 'Reimburses' the previous bet before placing a new one
                    // (e.g., user clicked 'bet 1', then 'bet 2')
                    this._money += this._betAmount;
                }
                this._betAmount = amount;
                this._money -= amount;
            }
        }
        
        // Calculate earnings (if any)
        private _calculateEarnings(): number{
            var bet: number = this._betAmount;
            var earnings: number = 0;
            
            // 'Spend' the player money
            this._betAmount = 0;
            
            // Separate the betline in an array
            var betline: string[] = [
                this._reel1[1].itemName,
                this._reel2[1].itemName,
                this._reel3[1].itemName,
            ];
            
            // Scores sequences of same figures
            if (betline[0] === betline[1] && betline[1] === betline[2]){
                
                switch (betline[0]){
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
                
            } else {
                // Scores the amount of single fruits, if any
                for (var i:number = 0; i < 3; i++){
                    if (betline[i] === 'Fruit'){
                        if (earnings === 0) earnings = 2 * bet;
                        else earnings = 5 * bet;
                    }
                }
            }
            
            // Pay back user and count wins
            this._money += earnings;
            if (earnings > 0) this._wins++;
            
            // Return results
            return earnings;
        }
        
        // Get a random reel item
        private _getRandomReelItem(): string {
            return SlotMachine.reelItems[Math.floor(Math.random() * SlotMachine.reelItems.length)]; 
        }
        
   
        // EVENT HANDLERS +++++++++++++++
        private _bet1ButtonClick(event: createjs.MouseEvent): void {
            if (this._bet1Button.enabled){
                this._betButtonSound.play();
                this._placeBet(1);
            }
        }
        
        private _bet2ButtonClick(event: createjs.MouseEvent): void {
            if (this._bet2Button.enabled){
                this._betButtonSound.play();
                this._placeBet(2);
            }
        }
        
        private _bet3ButtonClick(event: createjs.MouseEvent): void {
            if (this._bet3Button.enabled){
                this._betButtonSound.play();
                this._placeBet(3);
            }
        }
        
        private _spinButtonClick(event: createjs.MouseEvent): void {
            if (this._spinButton.enabled){
            
                // Randomize all three reels in all positions    
                for(var i:number = 0; i < 3; i++){
                    this._reel1[i] = new objects.ReelItem(this._getRandomReelItem(), 
                        SlotMachine.reelXcoords[0], 
                        SlotMachine.reelYcoords[i]);
                    this._reel2[i] = new objects.ReelItem(this._getRandomReelItem(), 
                        SlotMachine.reelXcoords[1], 
                        SlotMachine.reelYcoords[i]);
                    this._reel3[i] = new objects.ReelItem(this._getRandomReelItem(), 
                        SlotMachine.reelXcoords[2], 
                        SlotMachine.reelYcoords[i]);
                    this.addChild(this._reel1[i]);
                    this.addChild(this._reel2[i]);
                    this.addChild(this._reel3[i]);
                }
                
                // Calculate earnings & play SFX
                var amountWon: number = this._calculateEarnings();
                if (amountWon === SlotMachine.jackpotAmount){
                    // User won the jackpot
                    console.log('JACKPOT');
                    this._jackpotSound.play();
                } else if (amountWon > 20){
                    // User won big
                    console.log('User won ' + amountWon);
                    this._bigWinSound.play();
                } else if (amountWon > 0){
                    // User won
                    console.log('User won ' + amountWon);
                    this._winSound.play();
                } else {
                    // User did not win
                    console.log('No win');
                    this._loseSound.play();
                }
            
            }
        }
        
        private _resetButtonClick(event: createjs.MouseEvent): void {
            this._resetGame();
        }
        
        private _quitButtonClick(event: createjs.MouseEvent): void {
            // TODO: Quit game.
        }
               
        
    }
}