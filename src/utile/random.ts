export class Random {
    static shuffleArray<T>(array: T[]): void {
        array.sort(() => Math.random() - 0.5);
    }
}