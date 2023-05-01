class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        // Add object to existing scene
        scene.add.existing(this);
        this.isFiring = false;
        this.moveSpeed = 2;

        // Initialize Rocket SFX
        this.sfxRocket = scene.sound.add('sfx_rocket'); // add rocket sfx
    }

    update() {
        // left/right movement
        if(game.input.mousePointer.x < this.x && this.x >= borderUISize + this.width) {
            this.x -= this.moveSpeed;
        } else if (game.input.mousePointer.x > this.x && this.x <= game.config.width - borderUISize - this.width) {
            this.x += this.moveSpeed;
        }
        // Fire button
        if(game.input.mousePointer.isDown) {
            this.isFiring = true;
            this.sfxRocket.play(); // play sfx
        }
        // If fired, move up
        if(this.isFiring && this.y >= borderUISize * 3 + borderPadding) {
            this.y -= this.moveSpeed;
        }
        // Reset at miss
        if(this.y <= borderUISize * 3 + borderPadding) {
            this.isFiring = false;
            this.y = game.config.height - borderUISize - borderPadding;
        }
    }

    reset() {
        this.isFiring = false;
        this.y = game.config.height - borderUISize - borderPadding;
    }
}