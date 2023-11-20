import { ArrowDirection, FieldSize, ITile, IViewData, MoveVariable, NeighborsDataType } from './game.interfaces';
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

    constructor() {
        this.createData = new CreateData();

        // init by default 4x4
        this.tilesCount = this.gameSize ** 2;
        this.emptyTileValue = this.tilesCount;
        this.tiles = this.createData.createGameDataArray(this.tilesCount);
        this.gameStateOrder = this.createData.createGameState(this.tiles, this.gameSize);

        this.shuffleTiles(this.tiles);
        this.gameState = this.createData.createGameState(this.tiles, this.gameSize);

        //init App
        this.view = new App();
        const viewData = this.getViewData();
        this.view.showField(viewData);
    }

    getViewData(): IViewData {
        const emptyTileNeighborsIndex = this.getEmptyTileNeighborsIndex();
        const tilesForView = this.tiles.map(el => el.value);
        console.log(emptyTileNeighborsIndex);
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

        if (result === ArrowDirection.left) {

        }
    }

    getEmptyTileNeighborsIndex(): NeighborsDataType {
        const neighbors: NeighborsDataType = {
            left: { value: -1, index: -1 },
            right: { value: -1, index: -1 },
            top: { value: -1, index: -1 },
            bottom: { value: -1, index: -1 },
        }

        return this.gameState.reduce((acc: NeighborsDataType, line, lineIndex) => {
            const emptyTileIndexInLine = line.findIndex(el => el === this.emptyTileValue);
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
                    acc.top.value = this.gameState[topLineIndex][topIndex];
                    acc.top.index = this.gameStateOrder[topLineIndex][topIndex] - 1;
                }
                if (bottomLineIndex < this.gameState.length) {
                    acc.bottom.value = this.gameState[bottomLineIndex][bottomIndex];
                    acc.bottom.index = this.gameStateOrder[bottomLineIndex][bottomIndex] - 1;
                }
                console.log(this.gameStateOrder)
            }
            return acc;
        }, neighbors);
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