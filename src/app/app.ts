import { Control } from '../utile/control';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';

export class App extends Control {
    private header: Header;
    private main: Control;
    private footer: Footer;

    constructor(parent: HTMLElement) {
        super(parent, 'div', 'wrapper');
        this.header = new Header(this.node);
        this.main = new Control(this.node, 'main', 'main', 'main work');
        this.footer = new Footer(this.node);
    }

    destroy(): void {
        super.destroy();
    }
}