import { Enemy } from "../Enemy.js";

export class Slime extends Enemy {
	constructor(scene, x, y, texture = "slime") {
		super(scene, x, y, texture);
	}
}