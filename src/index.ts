import './assets/style/style.scss';
import { GameModel } from './model/game.model';

const model = new GameModel();

const game = async () => {
    model.startGame().then((res) => {
        console.log(res, 'index.ts');
        model.gameOver();
    });
}
game();

