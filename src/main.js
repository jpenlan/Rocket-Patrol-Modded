/* Jacob Penland

   Rocket Patrol 2: Electric Boogaloo

   Approx. 12 hours 

   Mods included:
    - Implement a new timing/scoring mechanism that adds time to the clock for successful hits (15) (Done)
    - Create a new enemy Spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (15) (Done)
    - Implement mouse control for player movement and mouse click to fire (15) (Done)
    - Display the time remaining (in seconds) on the screen (10) (Done)
    - Create 4 new explosion sound effects and randomize which one plays on impact (10) (Done)
    - Implement parallax scrolling for the background (10) (Done)
    - Create a new scrolling tile sprite for the background (5) (Done)
    - Allow the player to control the Rocket after it's fired (5) (Done)
    - Using a texture atlas, create a new animated sprite for the Spaceship enemies (10) (Done)
    - Add your own (copyright-free) background music to the Play scene (please be mindful of the volume) (5) (Done)

   Music sourced from:
    - https://pixabay.com/music/search/8bit/

   Additional resources:
    - https://stackoverflow.com/questions/51601926/how-to-set-volume-in-phaser-3
*/


let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [Menu, Play]
}

let game = new Phaser.Game(config);

//set UI Sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// Reserve keyboard variables
let keyF, keyR, keyLEFT, keyRIGHT, mouseDown;