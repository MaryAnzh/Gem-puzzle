import { Control } from "../../../utile/control";

export class Footer extends Control {

    constructor(parent: HTMLElement) {
        super(parent, 'footer', 'footer', 'footer work');
    }

    destroy(): void {
        super.destroy();
    }
}