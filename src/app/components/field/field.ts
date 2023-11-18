import { Component } from "../../../utile/component";

export class Field extends Component {
    tiles: HTMLElement[];
    tilesCount = 15;

    constructor(parent: HTMLElement) {
        super(parent, 'div', 'field');

        [...Array(this.tilesCount).keys()].forEach(el => {
            const div = new Component(this.node, 'div', 'field__tile');
            div.node.textContent = (el + 1).toString();
        });
    }
}