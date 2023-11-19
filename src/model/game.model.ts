import { FieldSize, ITile } from './game.interfaces';

export class GameModel {
    public tiles: ITile[] = [];
    private tileCount: number;
    private emptyTileIndex: number;

    constructor(tilesCount: FieldSize) {
        this.tileCount = tilesCount ** 2;
        this.emptyTileIndex = this.tileCount;

        [...Array(this.tileCount).keys()].forEach(el => {
            const v = el + 1;
            const tile: ITile = {
                value: v,
                order: v,
            }
            this.tiles.push(tile);
        });
        console.log(this.tiles);
    }

    winChecker = () => {
        let win = true;
        this.tiles.forEach(({ value, order }) => {
            if (value === order) {
                win = false;
            }
        });
        return win;
    }
}