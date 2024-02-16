import { Physics } from "phaser";

export class Enemy extends Physics.Arcade.Sprite {
	scene;

	constructor(scene, x, y, texture) {
		super(scene, x, y, texture);

		this.scene = scene;

		scene.add.existing(this);
		scene.physics.add.existing(this);

		if (!scene.anims.exists(`${texture}_run`)) {
			scene.anims.create({
				key: `${texture}_run`,
				frames: scene.anims.generateFrameNumbers(texture, {
					start: 0,
					end: 2,
				}),
				frameRate: 6,
				repeat: -1,
			});
		}

		this.play(`${texture}_run`);
	}

	move() {
		let angle =this.scene.physics.moveTo(this, this.scene.player.x, this.scene.player.y, 20);
        
        if(angle > -1.5 && angle < 1.5){
            this.setFlipX(false);
        }else{
            this.setFlipX(true);
        }
	}

	die() {
        this.scene.activeEnemies.splice(this.scene.activeEnemies.indexOf(this),1)
		this.destroy();
	}
}
