import { Actor, Vector } from "excalibur";
import { Resources } from "../resources";
import { Zombie } from "./zombie";

export class Projectile extends Actor {

    constructor(x, y, ui) {
        super({
            radius: Resources.Projectile.width / 2
        })
        this.graphics.use(Resources.Projectile.toSprite());
        this.pos = new Vector(x, y)
        this.scale = new Vector(0.4, 0.4)
        this.ui = ui;
    }

    onInitialize() {
        this.on("collisionstart", (event) => this.hit(event))
    }

    hit(event) {
        if (event.other.owner instanceof Zombie) {
            event.other.owner.kill();
            if (this.ui) {
                this.ui.setScore(this.ui.score + 10);
            }
            this.kill();
        }
    }
}