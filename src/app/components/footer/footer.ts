import { Component } from "../../../utile/component";

export class Footer extends Component {

    constructor(parent: HTMLElement) {
        super(parent, 'footer', 'footer', 'footer work');
    }

    destroy(): void {
        super.destroy();
    }
}