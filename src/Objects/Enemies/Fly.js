import { Enemy } from "../Enemy.js";

export class Fly extends Enemy {
	constructor(scene, x, y, texture = "fly") {
		super(scene, x, y, texture);
	}
}
