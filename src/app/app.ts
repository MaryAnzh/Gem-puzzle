import { Component } from '../utile/component';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { Field } from './components/field/field';
import { GameModel } from '../model/game.model';
import { FieldSize } from '../model/game.interfaces';

export class App extends Component {
    private header: Header;
    private main: Component;
    private footer: Footer;
    private field: Field;
    private title: Component;
    private gameModel: GameModel;
    private fieldSize: FieldSize = FieldSize['4x4'];

    constructor(parent: HTMLElement) {
        super(parent, 'div', 'wrapper');
        this.header = new Header(this.node);
        this.main = new Component(this.node, 'main', 'main');
        this.footer = new Footer(this.node);
        this.title = new Component(this.main.node, 'h2', 'main__title', 'Gem Puzzle');
        this.gameModel = new GameModel(this.fieldSize);
        this.field = new Field(this.main.node, this.gameModel.tiles);
    }

    destroy(): void {
        super.destroy();
    }
}