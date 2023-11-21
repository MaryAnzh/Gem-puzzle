import { FieldSize, ITile } from './game.interfaces';

export class CreateData {

    createGameDataArray(count: number): number[] {
        return [...Array(count).keys()].map(el => el + 1);
    }

    createGameState(tiles: number[], gameSize: FieldSize) {
        const state: number[][] = [];
        for (let i = 0; i < tiles.length; i++) {
            const line = Math.floor(i / gameSize);
            if (i % gameSize === 0) {
                state.push([]);
            }
            state[line].push(tiles[i]);
        }
        return state;
    }
}