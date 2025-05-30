import { Actor, Engine, Keys, Sprite, Vector } from "excalibur"
import { Resources, ResourceLoader } from '../resources.js'
import { Projectile } from "./projectile.js";
import { Zombie } from "./zombie.js";
import { Game } from "../game.js";

export class Player extends Actor {
    #xspeed = 0;
    #yspeed = 0;
    #bulletx = 0;
    #bullety = 0;
    #shootTimer = 0;
    #lives = 3;
    #lastBulletX = 0;
    #lastBulletY = 0;

    constructor(ui, playerNumber, currentGame) {
        super({
            radius: Resources.Player.width / 2 - 20
        });

        this.speed = 200;
        this.playerNumber = playerNumber;
        this.ui = ui;

        if (this.playerNumber === 1) {
            this.graphics.use(Resources.Player.toSprite());
        }
        if (this.playerNumber === 2) {
            this.graphics.use(Resources.PlayerTwo.toSprite());
        }

        this.pos = new Vector(Math.random() * 1000 + 100, 400);
        this.scale = new Vector(0.4, 0.4);
    }

    onPreUpdate(engine) {
        //reset variabele input
        this.#xspeed = 0;
        this.#yspeed = 0;
        this.#bulletx = 0;
        this.#bullety = 0;

        if (this.playerNumber === 1) {
            if (engine.input.keyboard.isHeld(Keys.A)) {
                this.#xspeed = -this.speed;
                this.graphics.flipHorizontal = false;
                this.#bulletx--;
            }
            if (engine.input.keyboard.isHeld(Keys.D)) {
                this.#xspeed = this.speed;
                this.graphics.flipHorizontal = true;
                this.#bulletx++;
            }
            if (engine.input.keyboard.isHeld(Keys.W)) {
                this.#yspeed = -this.speed;
                this.#bullety--;
            }
            if (engine.input.keyboard.isHeld(Keys.S)) {
                this.#yspeed = this.speed;
                this.#bullety++;
            }
            if (engine.input.keyboard.isHeld(Keys.ShiftLeft)) {
                this.speed = 300;
            } else {
                this.speed = 200;
            }

            //calculate velocity of characters after input
            this.vel = new Vector(this.#xspeed, this.#yspeed);

            if (engine.input.keyboard.isHeld(Keys.Space)) {
                this.#shootTimer++;
                if (this.#shootTimer >= 30) {
                    this.shoot();
                    this.#shootTimer = 0;
                }
            }
        }

        if (this.playerNumber === 2) {
            if (engine.input.keyboard.isHeld(Keys.Left)) {
                this.#xspeed = -this.speed;
                this.graphics.flipHorizontal = false;
                this.#bulletx--;
            }
            if (engine.input.keyboard.isHeld(Keys.Right)) {
                this.#xspeed = this.speed;
                this.graphics.flipHorizontal = true;
                this.#bulletx++;
            }
            if (engine.input.keyboard.isHeld(Keys.Up)) {
                this.#yspeed = -this.speed;
                this.#bullety--;
            }
            if (engine.input.keyboard.isHeld(Keys.Down)) {
                this.#yspeed = this.speed;
                this.#bullety++;
            }
            if (engine.input.keyboard.isHeld(Keys.Num0)) {
                this.speed = 300;
            } else {
                this.speed = 200;
            }

            this.vel = new Vector(this.#xspeed, this.#yspeed);

            if (engine.input.keyboard.isHeld(Keys.Enter)) {
                this.#shootTimer++;
                if (this.#shootTimer >= 30) {
                    this.shoot();
                    this.#shootTimer = 0;
                }
            }
        }
    }

    shoot() {
        if (this.#bulletx !== 0 || this.#bullety !== 0) {
            const projectile = new Projectile(this.pos.x, this.pos.y, this.ui);
            projectile.vel = new Vector(this.#bulletx * 600, this.#bullety * 600);
            projectile.rotation = Math.atan2(this.#bullety, this.#bulletx);
            this.scene.add(projectile);
            this.#lastBulletX = this.#bulletx;
            this.#lastBulletY = this.#bullety;
        }
        if (this.#bulletx == 0 || this.#bullety == 0) {
            const projectile = new Projectile(this.pos.x, this.pos.y, this.ui);
            projectile.vel = new Vector(this.#lastBulletX * 600, this.#lastBulletY * 600);
            projectile.rotation = Math.atan2(this.#lastBulletY, this.#lastBulletX);
            this.scene.add(projectile);
        }
    }

    onInitialize() {
        this.on("collisionstart", (event) => this.hit(event));
    }

    hit(event) {
        if (event.other.owner instanceof Zombie) {
            this.#lives--;
            if (this.#lives <= 0) {
                this.#lives = 3;
                window.currentGame.stop();
                window.currentGame.canvas.remove();
                window.currentGame = new Game();
            }
        }
    }
}