import { Actor, Label, Vector, Font, Color } from "excalibur";

export class UIP2 extends Actor {

    constructor() {
        super()
        this.score = 0;
    }

    onInitialize(engine) {
        this.scoreLabel = new Label({
            text: 'Score 0',
            pos: new Vector(50, 80),
            font: new Font({
                size: 30,
                family: 'Open Sans',
                weight: 'bold',
                color: Color.Red
            })
        });

        this.addChild(this.scoreLabel);
    }

    setScore(score) {
        this.score = score;
        this.scoreLabel.text = `Score: ${score}`;
    }
}
