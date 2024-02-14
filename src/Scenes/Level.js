import { Scene } from "phaser"
import { Player } from "../Objects/Player"

export class Level extends Scene {
	preload() {
		this.load.spritesheet("player_idle", "assets/player/knight_idle.png", { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet("player_run", "assets/player/knight_run.png", { frameWidth: 16, frameHeight: 16 });
	}

	create() {
		new Player(this, 50, 50, "player_idle")
	}

	update() {}
}
