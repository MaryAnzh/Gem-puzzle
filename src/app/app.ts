import { Component } from '../utile/component';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { Field } from './components/field/field';
import { ControlButtons } from './components/controlButtons/controlButtons';

import { ArrowDirection, ITile } from '../model/game.interfaces';

export class App extends Component {
    private body: HTMLBodyElement;
    private header: Header;
    private main: Component;
    private footer: Footer;
    private field: Field;
    private title: Component;
    fieldWrap: Component;
    buttons: ControlButtons;

    constructor() {
        super(null, 'div', 'wrapper');
        this.body = document.querySelector('body');
        this.body.append(this.node)
            ;
        this.header = new Header(this.node);
        this.main = new Component(this.node, 'main', 'main');
        this.footer = new Footer(this.node);
        this.title = new Component(this.main.node, 'h2', 'main__title', 'Gem Puzzle');
        this.fieldWrap = new Component(this.main.node, 'div', 'main__field-wrap');
        this.buttons = new ControlButtons(this.fieldWrap.node);
    }

    showField(tiles: ITile[]) {
        this.field = new Field(this.fieldWrap.node, tiles);
    }

    async tileMoveHandler() {
        return new Promise(resolve => {
            const onClick = (direction: ArrowDirection) => {
                resolve(direction);
            }
            this.buttons.addOnClickHandler(onClick);
        });
    }

    destroy(): void {
        super.destroy();
    }
}