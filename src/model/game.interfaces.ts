export interface ITile {
    value: number,
    order: number,
}

export enum FieldSize {
    '3x3' = 3,
    '4x4' = 4,
    '5x5' = 5,
    '6X6' = 6
};
export enum ArrowDirection {
    up = 'up',
    down = 'down',
    left = 'left',
    right = 'right'
}

type EmptyTileNeighbor = {
    value: number,
    lineInState: number,
    indexInLine: number,
}