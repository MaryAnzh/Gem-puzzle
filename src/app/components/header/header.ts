import { Component } from "../../../utile/component";

export class Header extends Component {

    constructor(parent: HTMLElement) {
        super(parent, 'header', 'header', 'Header work');
    }

    destroy(): void {
        super.destroy();
    }
}