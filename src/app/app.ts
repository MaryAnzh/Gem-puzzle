import { Component } from '../utile/component';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { Field } from './components/field/field';

export class App extends Component {
    private header: Header;
    private main: Component;
    private footer: Footer;
    private field: Field;
    private title: Component;

    constructor(parent: HTMLElement) {
        super(parent, 'div', 'wrapper');
        this.header = new Header(this.node);
        this.main = new Component(this.node, 'main', 'main');
        this.footer = new Footer(this.node);
        this.title = new Component(this.main.node, 'h2', 'main__title', 'Gem Puzzle');
        this.field = new Field(this.main.node);

    }

    destroy(): void {
        super.destroy();
    }
}