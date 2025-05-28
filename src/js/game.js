import '../css/style.css'
import { Actor, Engine, Vector, DisplayMode, SolverStrategy } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Player } from './characters/player.js'
import { BG } from './characters/bg.js'
import { Zombie } from './characters/zombie.js'
import { UI } from './ui.js'
import { UIP2 } from './uip2.js'

export class Game extends Engine {

    constructor() {
        super({
            width: 1280,
            height: 720,
            maxFps: 60,
            displayMode: DisplayMode.FitScreen,
            physics: {
                solver: SolverStrategy.Arcade
            }

        })
        this.start(ResourceLoader).then(() => this.startGame())
    }

    startGame() {


        const bg = new BG()
        this.add(bg);


        const ui = new UI();
        this.add(ui)

        const uip2 = new UIP2();
        this.add(uip2)


        const player = new Player(ui, 1);
        this.add(player);

        const playerTwo = new Player(uip2, 2)
        this.add(playerTwo)


        setInterval(() => {

            let randomNumber = Math.random() * 4;
            const zombie = new Zombie(randomNumber, player, playerTwo);
            this.add(zombie);

        }, 2000);

    }


}

new Game()
