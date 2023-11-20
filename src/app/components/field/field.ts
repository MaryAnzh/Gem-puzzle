import { FieldSize, ITile, IViewData, NeighborsDataType } from "../../../model/game.interfaces";
import { Component } from "../../../utile/component";

export class Field extends Component {
    tiles: Component[] = [];
    emptyTileValue: number;

    constructor(parent: HTMLElement, viewData: IViewData) {
        super(parent, 'div', 'field');
        const tilesCount = viewData.tiles.length;
        this.emptyTileValue = tilesCount;
        this.setFieldStyle(tilesCount);

        viewData.tiles.forEach((el, i) => {
            const content = el === tilesCount ? '' : `${el}`;
            const order = i + 1;

            const div = new Component(this.node, 'div', 'field__tile', content);
            div.node.style.order = `${order}`;
            this.tiles.push(div);
        });
        this.marksEmptyTileNeighbors(viewData.neighbors);
    }

    setFieldStyle(tilesCount: number) {
        const lineInGrid = Math.sqrt(tilesCount);
        const tilePresentSize = 100 / lineInGrid;

        this.node.style.gridTemplate = `repeat(${lineInGrid}, ${tilePresentSize}%) / repeat(${lineInGrid}, ${tilePresentSize}%)`;
    }

    marksEmptyTileNeighbors(neighborsData: NeighborsDataType) {
        this.tiles.forEach(el => {
            const content = el.node.textContent;
            if (neighborsData.neighbors.includes(+content)) {
                el.node.style.background = 'pink';
            }
        });
    }
}