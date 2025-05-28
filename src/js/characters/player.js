import { Actor, Engine, Keys, Sprite, Vector } from "excalibur"
import { Resources, ResourceLoader } from '../resources.js'
import { Projectile } from "./projectile.js";
import { Zombie } from "./zombie.js";

export class Player extends Actor {

    constructor(ui, playerNumber) {
        super({
            radius: Resources.Player.width / 2 - 20
        })

        this.speed = 200;
        this.graphics.use(Resources.Player.toSprite());
        this.pos = new Vector(Math.random() * 1000 + 500, 400)
        this.scale = new Vector(0.4, 0.4)
        this.shootTimer = 0;
        this.ui = ui;
        this.playerNumber = playerNumber;

    }

    onPreUpdate(engine) {
        let xpeed = 0;
        let yspeed = 0;

        this.bulletx = 0;
        this.bullety = 0;

        if (this.playerNumber === 1) {

            if (engine.input.keyboard.isHeld(Keys.A)) {
                xpeed = -this.speed;
                this.graphics.flipHorizontal = false;
                this.bulletx--;
            }
            if (engine.input.keyboard.isHeld(Keys.D)) {
                xpeed = this.speed;
                this.graphics.flipHorizontal = true;
                this.bulletx++;
            }
            if (engine.input.keyboard.isHeld(Keys.W)) {
                yspeed = -this.speed;
                this.bullety--;
            }
            if (engine.input.keyboard.isHeld(Keys.S)) {
                yspeed = this.speed;
                this.bullety++;
            }
            if (engine.input.keyboard.isHeld(Keys.ShiftLeft)) {
                this.speed = 300;
            } else {
                this.speed = 200;
            }

            this.vel = new Vector(xpeed, yspeed);


            // Decrease shootTimer if above 0


            if (engine.input.keyboard.isHeld(Keys.Space)) {
                this.shootTimer++; //+60 per seconden
                if (this.shootTimer >= 30) {
                    this.shoot();
                    this.shootTimer = 0
                }
            }
        }

        if (this.playerNumber === 2) {

            if (engine.input.keyboard.isHeld(Keys.Left)) {
                xpeed = -this.speed;
                this.graphics.flipHorizontal = false;
                this.bulletx--;
            }
            if (engine.input.keyboard.isHeld(Keys.Right)) {
                xpeed = this.speed;
                this.graphics.flipHorizontal = true;
                this.bulletx++;
            }
            if (engine.input.keyboard.isHeld(Keys.Up)) {
                yspeed = -this.speed;
                this.bullety--;
            }
            if (engine.input.keyboard.isHeld(Keys.Down)) {
                yspeed = this.speed;
                this.bullety++;
            }
            if (engine.input.keyboard.isHeld(Keys.ShiftRight)) {
                this.speed = 300;
            } else {
                this.speed = 200;
            }

            this.vel = new Vector(xpeed, yspeed);


            // Decrease shootTimer if above 0


            if (engine.input.keyboard.isHeld(Keys.Enter)) {
                this.shootTimer++; //+60 per seconden
                if (this.shootTimer >= 30) {
                    this.shoot();
                    this.shootTimer = 0
                }
            }

        }
    }

    shoot() {
        if (this.bulletx !== 0 || this.bullety !== 0) {
            const projectile = new Projectile(this.pos.x, this.pos.y, this.ui);
            projectile.vel = new Vector(this.bulletx * 600, this.bullety * 600)
            projectile.rotation = Math.atan2(this.bullety, this.bulletx);
            this.scene.add(projectile);
            this.lastBulletX = this.bulletx
            this.lastBulletY = this.bullety
        }
        if (this.bulletx == 0 || this.bullety == 0) {
            const projectile = new Projectile(this.pos.x, this.pos.y, this.ui);
            projectile.vel = new Vector(this.lastBulletX * 600, this.lastBulletY * 600)
            projectile.rotation = Math.atan2(this.lastBulletY, this.lastBulletX);
            this.scene.add(projectile);
        }

    }


    onInitialize() {
        this.on("collisionstart", (event) => this.hit(event))
    }

    hit(event) {
        if (event.other.owner instanceof Zombie) {
            this.kill();
        }
    }
}