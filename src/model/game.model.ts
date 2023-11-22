import { ArrowDirection, FieldSize, ITile, IViewData, MoveVariable, NeighborsDataType } from './game.interfaces';
import { CreateData } from './createData.model';
import { Random } from '../utile/random';

import { App } from '../app/app';

export class GameModel {
    private createData: CreateData;
    private view: App;

    private gameSize: FieldSize = FieldSize['3x3'];
    private tiles: number[] = [];
    private gameStateOrder: number[][] = [];
    private viewData: IViewData;

    constructor() {
        this.createData = new CreateData();

        // init by default 4x4
        const tilesCount = this.gameSize ** 2;
        this.tiles = this.createData.createGameDataArray(tilesCount);
        this.gameStateOrder = this.createData.createGameState(this.tiles, this.gameSize);
        //this.shuffleTiles(this.tiles);

        //init App
        this.view = new App();
        this.showView();
    }

    shuffleTiles(tiles: number[]) {
        Random.shuffleArray<number>(tiles);
    }

    getViewData(): IViewData {
        // находим клетки соседнии с пустой
        const emptyTileNeighborsIndex = this.getEmptyTileNeighborsIndex();

        return {
            tiles: this.tiles,
            neighbors: emptyTileNeighborsIndex,
        }
    }

    getEmptyTileNeighborsIndex(): NeighborsDataType {
        const neighbors: NeighborsDataType = {
            left: { value: null, index: null },
            right: { value: null, index: null },
            top: { value: null, index: null },
            bottom: { value: null, index: null },
        }
        const clone = [...this.tiles]
        const arrayForCheck = this.createData.createGameState(clone, this.gameSize);

        return arrayForCheck.reduce((acc: NeighborsDataType, line, lineIndex, arr) => {
            const emptyTileIndexInLine = line.findIndex(el => el === this.tiles.length);
            if (emptyTileIndexInLine > -1) {
                const leftIndex = emptyTileIndexInLine - 1;
                const rightIndex = emptyTileIndexInLine + 1;

                const topLineIndex = lineIndex - 1;
                const topIndex = emptyTileIndexInLine;

                const bottomLineIndex = lineIndex + 1;
                const bottomIndex = emptyTileIndexInLine;

                if (leftIndex > -1) {
                    acc.left.value = line[leftIndex];
                    acc.left.index = this.gameStateOrder[lineIndex][leftIndex] - 1;
                }
                if (rightIndex < line.length) {
                    acc.right.value = line[rightIndex];
                    acc.right.index = this.gameStateOrder[lineIndex][rightIndex] - 1;
                }
                if (topLineIndex > -1) {
                    acc.top.value = arr[topLineIndex][topIndex];
                    acc.top.index = this.gameStateOrder[topLineIndex][topIndex] - 1;
                }
                if (bottomLineIndex < arr.length) {
                    acc.bottom.value = arr[bottomLineIndex][bottomIndex];
                    acc.bottom.index = this.gameStateOrder[bottomLineIndex][bottomIndex] - 1;
                }
            }
            return acc;
        }, neighbors);
    }

    showView() {
        this.viewData = null;
        this.viewData = this.getViewData();
        this.view.showField(this.viewData);
    }

    async startGame(): Promise<string> {
        console.log('Start game');
        const result = await this.move();
        console.log(`${result} from start game`);
        return result;
    }

    async move(): Promise<string> {
        const result = await this.view.tileMoveHandler();
        const emptyTileIndex = this.tiles.findIndex(el => el === this.tiles.length);
        const minArraySize = -1;
        const maxArraySize = this.tiles.length;

        if (result === ArrowDirection.left) {
            const rightTileIndex = this.viewData.neighbors.right.index;
            this.replaceTiles(rightTileIndex, emptyTileIndex);
        }
        if (result === ArrowDirection.right) {
            const leftTileIndex = this.viewData.neighbors.left.index;
            this.replaceTiles(leftTileIndex, emptyTileIndex);
        }
        if (result === ArrowDirection.up) {
            const bottomIndex = emptyTileIndex + this.gameSize;
            if (bottomIndex < maxArraySize) {
                this.replaceTiles(bottomIndex, emptyTileIndex);
            }
        }
        if (result === ArrowDirection.down) {
            const topIndex = emptyTileIndex - this.gameSize;
            if (topIndex > minArraySize) {
                this.replaceTiles(topIndex, emptyTileIndex);
            }
        }
        this.showView();

        const win = this.winChecker()
        if (win) {
            return Promise.resolve('win');
        }
        return this.move();
    }

    replaceTiles(tileIndex: number, emptyTileIndex: number) {
        const movingElement = this.tiles[tileIndex];

        this.tiles[tileIndex] = this.tiles[emptyTileIndex];
        this.tiles[emptyTileIndex] = movingElement;
    }

    winChecker = () => {
        let win = true;
        this.tiles.forEach((el, i) => {
            if (el !== (i + 1)) {
                win = false;
            }
        });
        return win;
    }
    gameOver() {
        this.view.gameOver();
    }
}