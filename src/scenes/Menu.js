class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // Load audio
        this.load.audio('sfx_select', './assets/blip_select.wav');
        this.load.audio('boom1', './assets/boom1.wav');
        this.load.audio('boom2', './assets/boom2.wav');
        this.load.audio('boom3', './assets/boom3.wav');
        this.load.audio('boom4', './assets/boom4.wav');
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav'); 
        this.load.audio('music', './assets/neon.wav');
    }

    create() {
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        // Show menu text
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'ROCKET PATROL', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, ' Use <--> arrows to move and (F) to fire', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#00FF';
        menuConfig.color = '#000';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press <- for Novice or -> for Expert', menuConfig).setOrigin(0.5);

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
          // easy mode
          game.settings = {
            spaceshipSpeed: 3,
            tspaceshipSpeed: 8,
            gameTimer: 60000    
          }
          this.sound.play('sfx_select');
          Phaser.Input.Mouse.enabled = true;
          this.scene.start('playScene');    
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
          // hard mode
          game.settings = {
            spaceshipSpeed: 4,
            tspaceshipSpeed: 8,
            gameTimer: 15000    
          }
          this.sound.play('sfx_select');
          this.scene.start('playScene');    
        }
      }
}