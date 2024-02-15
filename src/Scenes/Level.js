import { Scene } from "phaser";
import { Player } from "../Objects/Player";

export class Level extends Scene {
	player;

	preload() {
		this.load.spritesheet("player_idle", "assets/player/knight_idle.png", { frameWidth: 16, frameHeight: 16 });
		this.load.spritesheet("player_run", "assets/player/knight_run.png", { frameWidth: 16, frameHeight: 16 });
		this.load.spritesheet("sword", "assets/player/sword.png", { frameWidth: 16, frameHeight: 16 });

		this.load.spritesheet("fly", "assets/enemy/fly.png", { frameWidth: 16, frameHeight: 16 });
		this.load.spritesheet("goblin", "assets/enemy/goblin.png", { frameWidth: 16, frameHeight: 16 });
		this.load.spritesheet("slime", "assets/enemy/slime.png", { frameWidth: 16, frameHeight: 16 });
	}

	create() {
		this.player = new Player(this, 50, 50, "player_idle");
	}

	update() {}
}
