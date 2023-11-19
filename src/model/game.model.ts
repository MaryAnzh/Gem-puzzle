import { FieldSize, ITile } from './game.interfaces';
import { App } from '../app/app';

export class GameModel {
    private view: App;
    private gameSize: FieldSize = FieldSize['4x4'];
    private tilesCount: number;
    private emptyTileIndex: number;
    public tiles: ITile[] = [];

    constructor() {
        // init by default 4x4
        this.tilesCount = this.gameSize ** 2;
        this.emptyTileIndex = this.tilesCount;
        this.tiles = this.createGameDataArray(this.tilesCount);

        //init App
        this.view = new App();
        this.view.showField(this.tiles);
    }

    createGameDataArray(count: number): ITile[] {
        return [...Array(count).keys()].map(el => {
            const v = el + 1;
            const tile: ITile = {
                value: v,
                order: v,
            }
            return tile;
        });
    }

    async startGame() {
        const move = await this.move();
    }

    async move() {
        const result = await this.view.tileMoveHandler();
        console.log(result);
        if (true) {
            this.move();
        }
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