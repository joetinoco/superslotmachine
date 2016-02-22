/// <reference path = "_reference.ts" />
// global variables
var assets;
var canvas;
var stage;
var stats;
var currentScene;
var scene;
// Game Scenes
var menu;
var slotMachine;
var gameOver;
var assetData = [
    // Buttons
    { id: "PlayButton", src: "../../Assets/images/PlayButton.png" },
    { id: "ResetButton", src: "../../Assets/images/ResetButton.png" },
    { id: "QuitButton", src: "../../Assets/images/QuitButton.png" },
    { id: "Bet1Button", src: "../../Assets/images/Bet1Button.png" },
    { id: "Bet2Button", src: "../../Assets/images/Bet2Button.png" },
    { id: "Bet3Button", src: "../../Assets/images/Bet3Button.png" },
    { id: "SpinButton", src: "../../Assets/images/SpinButton.png" },
    // Machine elements
    { id: "SlotMachine", src: "../../Assets/images/SlotMachine.png" },
    { id: "ReelReset", src: "../../Assets/images/ReelReset.png" },
    { id: "ReelMask", src: "../../Assets/images/ReelMask.png" },
    // Reel elements
    { id: "Blank", src: "../../Assets/images/blank.png" },
    { id: "Fruit", src: "../../Assets/images/fruit.png" },
    { id: "Mushroom", src: "../../Assets/images/mushroom.png" },
    { id: "Coin", src: "../../Assets/images/coin.png" },
    { id: "Yoshi", src: "../../Assets/images/yoshi.png" },
    { id: "Mario", src: "../../Assets/images/mario.png" },
    { id: "Star", src: "../../Assets/images/star.png" }
];
function preload() {
    assets = new createjs.LoadQueue();
    assets.installPlugin(createjs.Sound);
    assets.on("complete", init, this);
    assets.loadManifest(assetData);
}
function init() {
    // create a reference the HTML canvas Element
    canvas = document.getElementById("canvas");
    // create our main display list container
    stage = new createjs.Stage(canvas);
    // double the stage scale so the elements look pixelated
    stage.scaleX = 2;
    stage.scaleY = 2;
    // Enable mouse events
    stage.enableMouseOver(20);
    // set the framerate to 60 frames per second
    createjs.Ticker.setFPS(config.Game.FPS);
    // create an event listener to count off frames
    createjs.Ticker.on("tick", gameLoop, this);
    // sets up our stats counting workflow
    setupStats();
    // set initial scene
    scene = config.Scene.MENU;
    changeScene();
}
// Main Game Loop function that handles what happens each "tick" or frame
function gameLoop(event) {
    // start collecting stats for this frame
    stats.begin();
    // calling State's update method
    currentScene.update();
    // redraw/refresh stage every frame
    stage.update();
    // stop collecting stats for this frame
    stats.end();
}
// Setup Game Stats
function setupStats() {
    stats = new Stats();
    stats.setMode(0); // shows fps
    stats.domElement.style.position = "absolute";
    stats.domElement.style.left = "0px";
    stats.domElement.style.top = "0px";
    document.body.appendChild(stats.domElement);
}
// Finite State Machine used to change Scenes
function changeScene() {
    // Launch various scenes
    switch (scene) {
        case config.Scene.MENU:
            // show the MENU scene
            stage.removeAllChildren();
            menu = new scenes.Menu();
            currentScene = menu;
            console.log("Starting MENU Scene");
            break;
        case config.Scene.SLOT_MACHINE:
            // show the PLAY scene
            stage.removeAllChildren();
            slotMachine = new scenes.SlotMachine();
            currentScene = slotMachine;
            console.log("Starting SLOT_MACHINE Scene");
            break;
        case config.Scene.GAME_OVER:
            // show the game OVER scene
            stage.removeAllChildren();
            gameOver = new scenes.GameOver();
            currentScene = gameOver;
            console.log("Starting GAME_OVER Scene");
            break;
    }
    console.log(currentScene.numChildren);
}
//# sourceMappingURL=game.js.map