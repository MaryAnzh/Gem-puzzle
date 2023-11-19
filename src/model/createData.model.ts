import { FieldSize, ITile } from './game.interfaces';

export class CreateData {

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

    createGameState(tiles: ITile[], gameSize: FieldSize) {
        const state: number[][] = [];
        for (let i = 0; i < tiles.length; i++) {
            const line = Math.floor(i / gameSize);
            if (i % gameSize === 0) {
                state.push([]);
            }
            state[line].push(tiles[i].value);
        }
        return state;
    }
}