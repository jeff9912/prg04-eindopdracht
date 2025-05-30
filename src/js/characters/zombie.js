import { Actor, Engine, Keys, Vector } from "excalibur"
import { Resources, ResourceLoader } from '../resources.js'

export class Zombie extends Actor {

    #speed = 0;
    #target = null;
    #dist1 = 0;
    #dist2 = 0;
    #direction = null;

    constructor(randomNumber, player1, player2) {
        super({
            radius: Resources.Zombie.width / 2 - 70
        });

        this.graphics.use(Resources.Zombie.toSprite());
        this.scale = new Vector(0.3 + Math.random() * 0.2, 0.3 + Math.random() * 0.2)
        this.player1 = player1;
        this.player2 = player2;

        if (randomNumber <= 1) {
            this.pos = new Vector(Math.random() * 1280, -100)
            this.#speed = Math.random() * 200;
        }
        else if (randomNumber <= 2) {
            this.pos = new Vector(Math.random() * 1280, 800)
            this.#speed = Math.random() * 300;
        }
        else if (randomNumber <= 3) {
            this.pos = new Vector(-100, Math.random() * 720)
            this.#speed = Math.random() * 300;
        }
        else if (randomNumber <= 4) {
            this.pos = new Vector(1400, Math.random() * 720)
            this.#speed = Math.random() * 300;
        }
    }

    onPreUpdate(engine) {

        //target is player 1, if distance player 2 is shorter target is player 2
        this.#target = this.player1;
        if (this.player2) {
            this.#dist1 = this.player1.pos.distance(this.pos);
            this.#dist2 = this.player2.pos.distance(this.pos);
            this.#target = this.#dist2 < this.#dist1 ? this.player2 : this.player1;
        }

        //direction, velocity and rotation calculation
        if (this.#target) {
            this.#direction = this.#target.pos.sub(this.pos).normalize();
            this.vel = this.#direction.scale(this.#speed);

            const dx = this.#target.pos.x - this.pos.x;
            const dy = this.#target.pos.y - this.pos.y;
            this.rotation = Math.atan2(dy, dx);
        }
    }
}