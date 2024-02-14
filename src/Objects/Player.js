import { Physics } from "phaser"

export class Player extends Physics.Arcade.Sprite {

    speed = 40;

	constructor(scene, x, y, texture = "player") {
		super(scene, x, y, texture)
		scene.add.existing(this)
		scene.physics.add.existing(this)

		scene.anims.create({
			key: "idle",
			frames: scene.anims.generateFrameNumbers(texture, {
				start: 0,
				end: 5,
			}),
			frameRate: 6,
			repeat: -1,
		})

		scene.anims.create({
			key: "run",
			frames: scene.anims.generateFrameNumbers("player_run", {
				start: 0,
				end: 5,
			}),
			frameRate: 6,
			repeat: -1,
		})

		this.play("idle")

		scene.input.keyboard.on("keydown-S", () => {
			this.setVelocityY(this.speed)
			this.updateAnimation()
		})
		scene.input.keyboard.on("keyup-S", () => {
			this.setVelocityY(0)
			this.updateAnimation()
		})
		scene.input.keyboard.on("keydown-W", () => {
			this.setVelocityY(-this.speed)
			this.updateAnimation()
		})
		scene.input.keyboard.on("keyup-W", () => {
			this.setVelocityY(0)
			this.updateAnimation()
		})

		scene.input.keyboard.on("keydown-D", () => {
			this.setVelocityX(this.speed)
			this.setFlipX(false)
			this.updateAnimation()
		})
		scene.input.keyboard.on("keyup-D", () => {
			this.setVelocityX(0)
			this.updateAnimation()
		})
		scene.input.keyboard.on("keydown-A", () => {
			this.setVelocityX(-this.speed)
			this.setFlipX(true)
			this.updateAnimation()
		})
		scene.input.keyboard.on("keyup-A", () => {
			this.setVelocityX(0)
			this.updateAnimation()
		})
	}

	updateAnimation() {
		if (this.body.velocity.x != 0 || this.body.velocity.y != 0) {
			this.play("run", true);
		} else {
            this.play("idle", true);
		}
	}
}
