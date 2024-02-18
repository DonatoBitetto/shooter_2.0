import { Scene, Math } from "phaser"
import { Player } from "../Objects/Player"
import { Fly } from "../Objects/Enemies/Fly"
import { Goblin } from "../Objects/Enemies/Goblin"
import { Slime } from "../Objects/Enemies/Slime"
import { Door } from "../Objects/Door"

export class Level extends Scene {
	startAnimation
	targetPosStartAnimation = 64
	door
	player
	enemies = [
		(x,y) => new Fly(this, x, y),
		(x,y) => new Goblin(this, x, y),
		(x,y) => new Slime(this, x, y),
	]
	activeEnemies = []
	attacks = []

	init() {
		this.startAnimation = true
		this.activeEnemies = []
		this.attacks = []
	}

	preload() {
		this.load.spritesheet("player_idle", "assets/player/knight_idle.png", { frameWidth: 16, frameHeight: 16 })
		this.load.spritesheet("player_run", "assets/player/knight_run.png", { frameWidth: 16, frameHeight: 16 })
		this.load.spritesheet("sword", "assets/player/sword.png", { frameWidth: 16, frameHeight: 16 })

		this.load.spritesheet("fly", "assets/enemy/fly.png", { frameWidth: 16, frameHeight: 16 })
		this.load.spritesheet("goblin", "assets/enemy/goblin.png", { frameWidth: 16, frameHeight: 16 })
		this.load.spritesheet("slime", "assets/enemy/slime.png", { frameWidth: 16, frameHeight: 16 })
		this.load.spritesheet("door", "assets/door.png", { frameWidth: 32, frameHeight: 32 })

		this.load.tilemapTiledJSON("tilemap", "assets/Map.json")
		this.load.image("shooter", "assets/tilesheet.png")
	}

	create() {
		this.map = this.make.tilemap({ key: "tilemap" })
		this.map.addTilesetImage("shooter")
		this.map.createLayer("Floor", "shooter")
		let wallLayer = this.map.createLayer("Walls", "shooter")
		wallLayer.setCollisionBetween(1, wallLayer.tilesTotal)
		this.map.createLayer("Decorations", "shooter")

		this.player = new Player(this, 320, 0, "player_idle")

		this.door = new Door(this, 320, 16, "door")

		this.time.addEvent({
			delay: 100,
			loop: true,
			callback: () => {
				let x = Math.Between(0, this.game.config.width);
				let y = Math.Between(0, this.game.config.height);
				if(!this.cameras.main.getBounds().contains(x, y)){
					let enemy = this.enemies[Math.Between(0, this.enemies.length - 1)](x,y)
					this.activeEnemies = [...this.activeEnemies, enemy];
				}
			},
		})

		this.physics.add.collider(this.player, wallLayer)
		this.physics.add.collider(this.player, this.door)

		this.cameras.main.startFollow(this.player).setZoom(2).setBounds(10, 5, 620, 344)
	}

	update() {
		if (this.startAnimation) {
			this.physics.moveTo(this.player, this.player.x, this.targetPosStartAnimation, this.player.speed)
			if (this.player.y >= this.targetPosStartAnimation) {
				this.player.setVelocity(0)
				this.startAnimation = false
				this.player.play("idle")
				this.door.play("door");
			}
		}


		this.activeEnemies.forEach((enemy) => {
			enemy.move()
		})

		this.physics.collide(this.player, this.activeEnemies, () => {
			this.scene.restart()
		})
		this.physics.collide(this.activeEnemies, this.attacks, (enemy, attack) => {
			enemy.die()
			attack.destroy()
		})
	}
}
