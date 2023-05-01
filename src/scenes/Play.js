class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image('rocket', './assets/rocket.png');
        this.load.atlas('spaceshipAtlas', './assets/spaceshipAtlas.png', './assets/spaceshipAtlas.json');
        this.load.image('sky', './assets/sky.png');
        this.load.image('stars', './assets/stars.png');
        this.load.image('tspaceship', './assets/tspaceship.png');
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }

    create() {

        // Add sky
        this.sky = this.add.tileSprite(0, 0, 640, 480, 'sky').setOrigin(0, 0);
        this.stars = this.add.tileSprite(0, 0, 640, 480, 'stars').setOrigin(0, 0);

        // green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0,0);
        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF0).setOrigin(0,0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0,0);

        // Add rocket (player 1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket', 0).setOrigin(0.5, 0);

        // Add spaceships (x3)
        this.ship01 =  new Spaceship(this, game.config.width + borderUISize * 6, borderUISize * 4, 'spaceshipAtlas', 0, 30).setOrigin(0, 0);
        this.ship02 =  new TSpaceship(this, game.config.width + borderUISize * 3, borderUISize * 5 + borderPadding * 2, 'tspaceship', 0, 50).setOrigin(0, 0);
        this.ship03 =  new Spaceship(this, game.config.width, borderUISize * 6 + borderPadding * 4, 'spaceshipAtlas', 0, 10).setOrigin(0, 0);

        // Define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        // Animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        })

        // Generate ship frames
        this.anims.create({
            key: 'flying',
            frames: this.anims.generateFrameNames('spaceshipAtlas', { 
                prefix: 'spaceshipAtlas ',
                suffix: '.ase', 
                start: 0,
                end: 7,
                zeroPad: 2
            }),
            frameRate: 12,
            repeat: -1
        });
        

        // Initialize Score
        this.p1Score = 0;

        // Display score
        this.scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100 
            }
            this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding * 2, this.p1Score, this.scoreConfig);
        this.scoreConfig.fixedWidth = 0;


        // Initialize timer
        this.counter = game.settings.gameTimer / 1000;
        this.startTime = this.time.now; // Resets every 1000 milliseconds

        // Display timer
        this.timerConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100 
            }
            this.timeLeft = this.add.text(borderUISize + borderPadding * 44, borderUISize + borderPadding * 2, this.counter, this.timerConfig);
            this.timerConfig.fixedWidth = 0;

            // Play music
            this.sound.play('music', { volume: 0.5, repeat: -1});

            // GAME OVER flag
            this.gameOver = false;  


            // Animate ships
            this.ship01.anims.play('flying');
            this.ship03.anims.play('flying');
        }

        
        update() {

            // Adaptive timer
            let nowTime = this.time.now
            if(nowTime > (this.startTime + 1000)) {
                this.counter -= 1;
                this.startTime = nowTime
                this.timeLeft.text = this.counter;
            }
            
            // Displays game over at time end
            if (this.counter == 0) {
                this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', this.scoreConfig).setOrigin(0.5);
                this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or <- to Menu', this.scoreConfig).setOrigin(0.5);
                this.sound.get('music').stop();
                this.gameOver = true;
            }

            // Check key input for restart
            if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
                this.scene.restart();
            }

            if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
                this.scene.start("menuScene");
              }

            this.sky.tilePositionX -= 4;
            this.stars.tilePositionX -= 5;

            if (!this.gameOver) {
                this.p1Rocket.update();
                this.ship01.update();
                this.ship02.update();
                this.ship03.update();
            }
            
    
            //check collisions
            if(this.checkCollision(this.p1Rocket, this.ship03)) {
                this.p1Rocket.reset();
                this.shipExplode(this.ship03);
            }
            if(this.checkCollision(this.p1Rocket, this.ship02)) {
                this.p1Rocket.reset();
                this.shipExplode(this.ship02);
            }
            if(this.checkCollision(this.p1Rocket, this.ship01)) {
                this.p1Rocket.reset();
                this.shipExplode(this.ship01);
            }
        }
    
        checkCollision(rocket, ship) {
            if (rocket.x < ship.x + ship.width && rocket.x + rocket.width > ship.x && rocket.y < ship.y + ship.height && rocket.height + rocket.y > ship.y) {
                return true;
            } else {
                return false;
            }
        }
    
        shipExplode(ship) {
            // Temporarily hide ship
            ship.alpha = 0;
            // Create explosion sprite on ship's position
            let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
            boom.anims.play('explode'); // Play explode animation
            boom.on('animationcomplete', () => { // Callback after animation completes
                ship.reset(); // Reset ship position
                ship.alpha = 1; // Make ship visible again
                boom.destroy(); // Remove explosion sprite
            });

            // Score add, add to the time, and repaint
            this.p1Score += ship.points;
            this.counter += 3;
            this.scoreLeft.text = this.p1Score;

            this.boomEffectValue = Phaser.Math.Between(0, 3);
            if (this.boomEffectValue == 0) {
                this.sound.play('boom1');
            }
            else if (this.boomEffectValue == 1) {
                this.sound.play('boom2');
            }
            else if (this.boomEffectValue == 2) {
                this.sound.play('boom3');
            }
            else if (this.boomEffectValue == 3) {
                this.sound.play('boom4');
            }
            
        }
        
    }

    