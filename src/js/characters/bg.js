import { Actor, Vector } from "excalibur";
import { Resources, ResourceLoader } from '../resources.js'


export class BG extends Actor {

    constructor() {
        super({})
        this.graphics.use(Resources.Grass.toSprite());
        this.scale = new Vector (1.5, 1.5)
    }
}