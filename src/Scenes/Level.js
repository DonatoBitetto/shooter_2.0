import { Scene, Math } from "phaser";
import { Player } from "../Objects/Player";
import { Fly } from "../Objects/Enemies/Fly";
import { Goblin } from "../Objects/Enemies/Goblin";
import { Slime } from "../Objects/Enemies/Slime";

export class Level extends Scene {
	player;
	enemies = [
		() => new Fly(this, Math.Between(0, this.game.config.width), Math.Between(0, this.game.config.height)),
		() => new Goblin(this, Math.Between(0, this.game.config.width), Math.Between(0, this.game.config.height)),
		() => new Slime(this, Math.Between(0, this.game.config.width), Math.Between(0, this.game.config.height)),
	];
	activeEnemies = [];
	attacks = [];

	init() {
		this.activeEnemies = [];
		this.attacks = [];
	}

	preload() {
		this.load.spritesheet("player_idle", "assets/player/knight_idle.png", { frameWidth: 16, frameHeight: 16 });
		this.load.spritesheet("player_run", "assets/player/knight_run.png", { frameWidth: 16, frameHeight: 16 });
		this.load.spritesheet("sword", "assets/player/sword.png", { frameWidth: 16, frameHeight: 16 });

		this.load.spritesheet("fly", "assets/enemy/fly.png", { frameWidth: 16, frameHeight: 16 });
		this.load.spritesheet("goblin", "assets/enemy/goblin.png", { frameWidth: 16, frameHeight: 16 });
		this.load.spritesheet("slime", "assets/enemy/slime.png", { frameWidth: 16, frameHeight: 16 });

		this.load.tilemapTiledJSON("tilemap", "assets/Map.json");
		this.load.image("shooter", "assets/tilesheet.png");
	}

	create() {
		this.map = this.make.tilemap({ key: "tilemap" });
		this.map.addTilesetImage("shooter");
		this.map.createLayer("Floor", "shooter");
		let wallLayer = this.map.createLayer("Walls", "shooter");
		wallLayer.setCollisionByProperty({ collides: true });

		this.player = new Player(this, 50, 50, "player_idle");
		this.time.addEvent({
			delay: 1000,
			reset: 1,
			loop: false,
			callback: () => {
				let enemy = this.enemies[Math.Between(0, this.enemies.length - 1)]();
				this.activeEnemies = [...this.activeEnemies, enemy];
			},
		});

		this.physics.add.collider(this.player, wallLayer);
	}

	update() {
		this.activeEnemies.forEach((enemy) => {
			enemy.move();
		});

		this.physics.collide(this.player, this.activeEnemies, () => {
			this.scene.restart();
		});
		this.physics.collide(this.activeEnemies, this.attacks, (enemy, attack) => {
			enemy.die();
			attack.destroy();
		});
	}
}
