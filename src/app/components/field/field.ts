import { FieldSize, ITile } from "../../../model/game.interfaces";
import { Component } from "../../../utile/component";

export class Field extends Component {
    tiles: HTMLElement[];

    constructor(parent: HTMLElement, tiles: ITile[]) {
        super(parent, 'div', 'field');
        const lineInGrid = Math.sqrt(tiles.length);
        const tilePresentSize = 100 / lineInGrid;

        this.node.style.gridTemplate = `repeat(${lineInGrid}, ${tilePresentSize}%) / repeat(${lineInGrid}, ${tilePresentSize}%)`;
        tiles.forEach(({ value, order }) => {
            const content = value === tiles.length ? '' : `${order}`;
            const div = new Component(this.node, 'div', 'field__tile', content);
            div.node.style.order = `${order}`;
        });
    }

    async tileMoveHandler() {
        return new Promise(resolve => {

        });
    }
}