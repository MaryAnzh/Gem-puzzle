import { FieldSize, ITile } from "../../../model/game.interfaces";
import { Component } from "../../../utile/component";

export class Field extends Component {
    tiles: Component[] = [];
    emptyTileValue: number;

    constructor(parent: HTMLElement, tiles: ITile[], gameSize: FieldSize) {
        super(parent, 'div', 'field');
        this.emptyTileValue = tiles.length;
        this.setFieldStyle(tiles.length);

        tiles.forEach(({ value, order }) => {
            const content = value === tiles.length ? '' : `${value}`;
            const div = new Component(this.node, 'div', 'field__tile', content);
            div.node.style.order = `${order}`;
            this.tiles.push(div);
        });
    }

    setFieldStyle(tilesCount: number) {
        const lineInGrid = Math.sqrt(tilesCount);
        const tilePresentSize = 100 / lineInGrid;

        this.node.style.gridTemplate = `repeat(${lineInGrid}, ${tilePresentSize}%) / repeat(${lineInGrid}, ${tilePresentSize}%)`;
    }

    marksEmptyTileNeighbors(neighbors: number[]) {
        this.tiles.forEach(el => {
            const content = el.node.textContent;
            if (neighbors.includes(+content)) {
                el.node.style.background = 'pink';
            }
        });
    }

    async tileMoveHandler() {
        return new Promise(resolve => {

        });
    }
}