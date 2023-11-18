import { Control } from "../../../utile/control";

export class Header extends Control {

    constructor(parent: HTMLElement) {
        super(parent, 'header', 'header', 'Header work');
    }

    destroy(): void {
        super.destroy();
    }
}