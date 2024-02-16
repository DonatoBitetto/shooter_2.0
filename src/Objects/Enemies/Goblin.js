import { Enemy } from "../Enemy.js";

export class Goblin extends Enemy {
	constructor(scene, x, y, texture = "goblin") {
		super(scene, x, y, texture);
	}
}