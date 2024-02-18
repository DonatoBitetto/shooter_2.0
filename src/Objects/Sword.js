import { Physics } from "phaser";

export class Sword extends Physics.Arcade.Sprite {
	speed = 40;

	constructor(scene, x, y, texture, pointer) {
		super(scene, x, y, texture);
		scene.add.existing(this);
		scene.physics.add.existing(this);
		scene.attacks = [...scene.attacks,this];

		if (!scene.anims.exists("sword")) {
			scene.anims.create({
				key: "sword",
				frames: scene.anims.generateFrameNumbers(texture, {
					start: 0,
					end: 2,
				}),
				duration: 600,
				repeat: -1,
			});
		}

		
		this.play("sword");

		let angle = scene.physics.moveTo(this, pointer.worldX, pointer.worldY, this.speed);
        this.setRotation(angle);

		setTimeout(() => {
			this.destroy();
		}, 2000);
	}

	die(){
		this.scene.attacks.splice(this.scene.attacks.indexOf(this),1)
		this.destroy();
	}
}
