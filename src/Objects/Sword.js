import { Physics } from "phaser";

export class Sword extends Physics.Arcade.Sprite {
	speed = 40;

	constructor(scene, x, y, texture, pointer) {
		super(scene, x, y, texture);
		scene.add.existing(this);
		scene.physics.add.existing(this);

		if (!scene.anims.exists("sword")) {
			scene.anims.create({
				key: "sword",
				frames: scene.anims.generateFrameNumbers(texture, {
					start: 0,
					end: 2,
				}),
				frameRate: 6,
				repeat: -1,
			});
		}

		this.play("sword");


		let angle = scene.physics.moveTo(this, pointer.x, pointer.y, this.speed);
        this.setRotation(angle);

		setTimeout(() => {
			this.destroy();
		}, 2000);
	}
}
