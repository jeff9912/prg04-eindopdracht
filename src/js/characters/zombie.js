import { Actor, Engine, Keys, Vector } from "excalibur"
import { Resources, ResourceLoader } from '../resources.js'

export class Zombie extends Actor {
    constructor(randomNumber, player1, player2) {
        super({
            radius: Resources.Zombie.width / 2 - 70

        })


        this.graphics.use(Resources.Zombie.toSprite());
        this.pos = new Vector(Math.random() * 1280, Math.random() * 720)
        this.scale = new Vector(0.3 + Math.random() * 0.2, 0.3 + Math.random() * 0.2)
        this.player1 = player1;
        this.player2 = player2;


        if (randomNumber <= 1) {
            this.pos = new Vector(Math.random() * 1280, -100)
            this.speed = Math.random() * 200;
            // this.vel = new Vector(Math.random() * 200 - 100, Math.random() * 100)
        }
        else if (randomNumber <= 2) {
            this.pos = new Vector(Math.random() * 1280, 800)
            this.speed = Math.random() * 300;
            // this.vel = new Vector(Math.random() * 200 - 100, Math.random() * -100)
        }
        else if (randomNumber <= 3) {
            this.pos = new Vector(-100, Math.random() * 720)
            this.speed = Math.random() * 300;
            // this.vel = new Vector(Math.random() * 100, Math.random() * 200 - 100)
        }
        else if (randomNumber <= 4) {
            this.pos = new Vector(1400, Math.random() * 720)
            this.speed = Math.random() * 300;
            // this.vel = new Vector(Math.random() * -100, Math.random() * 200 - 100)
        }

    }

    onPreUpdate(engine) {
        // Find the closest player
        let target = this.player1;
        if (this.player2) {
            const dist1 = this.player1.pos.distance(this.pos);
            const dist2 = this.player2.pos.distance(this.pos);
            target = dist2 < dist1 ? this.player2 : this.player1;
        }

        if (target) {
            const direction = target.pos.sub(this.pos).normalize();
            this.vel = direction.scale(this.speed);

            // Set rotation to face the target
            const dx = target.pos.x - this.pos.x;
            const dy = target.pos.y - this.pos.y;
            this.rotation = Math.atan2(dy, dx);
        }
    }

}