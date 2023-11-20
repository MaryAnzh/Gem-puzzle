import { FieldSize, ITile, IViewData } from './game.interfaces';
import { CreateData } from './createData.model';
import { Random } from '../utile/random';

import { App } from '../app/app';

export class GameModel {
    private createData: CreateData;
    private view: App;
    private gameSize: FieldSize = FieldSize['4x4'];
    private tilesCount: number;
    private emptyTileValue: number;
    private tiles: ITile[] = [];
    private gameState: number[][] = [];
    private gameStateOrder: number[][] = [];
    private viewData: IViewData = {
        tiles: [],
        neighbors: [],
    }

    constructor() {
        this.createData = new CreateData();

        // init by default 4x4
        this.tilesCount = this.gameSize ** 2;
        this.emptyTileValue = this.tilesCount;
        this.tiles = this.createData.createGameDataArray(this.tilesCount);
        this.shuffleTiles(this.tiles);

        this.gameState = this.createData.createGameState(this.tiles, this.gameSize);
        this.gameStateOrder = this.createData.createGameState(this.tiles, this.gameSize);
        const viewData = this.getViewData();

        //init App
        this.view = new App();
        this.view.showField(viewData);
    }

    getViewData(): IViewData {
        const emptyTileNeighborsIndex = this.getEmptyTileNeighborsIndex();
        const tilesForView = this.tiles.map(el => el.value);
        return {
            tiles: tilesForView,
            neighbors: emptyTileNeighborsIndex,
        }
    }

    shuffleTiles(tiles: ITile[]) {
        Random.shuffleArray<ITile>(tiles);
        tiles.forEach((el, i) => el.order = i);
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

    getEmptyTileNeighborsIndex(): number[] {
        const checkElem = (elem: number | null, array: number[]) => {
            if (elem !== null) { array.push(elem) }
        }

        return this.gameState.reduce((acc, line, lineIndex) => {
            const emptyTileIndexInLine = line.findIndex(el => el === this.emptyTileValue);
            if (emptyTileIndexInLine > -1) {
                const left = emptyTileIndexInLine - 1 > -1 ? this.gameState[lineIndex][emptyTileIndexInLine - 1] : null;
                const right = emptyTileIndexInLine + 1 < line.length ? this.gameState[lineIndex][emptyTileIndexInLine + 1] : null;

                const topLine = lineIndex - 1 > -1 ? lineIndex - 1 : null;
                const top = topLine !== null ? this.gameState[topLine][emptyTileIndexInLine] : null;

                const bottomLine = lineIndex + 1 < this.gameState.length ? lineIndex + 1 : null;
                const bottom = bottomLine !== null ? this.gameState[bottomLine][emptyTileIndexInLine] : null;

                [left, right, top, bottom].forEach((el: number | null) => checkElem(el, acc));
            }
            return acc;
        }, []);
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