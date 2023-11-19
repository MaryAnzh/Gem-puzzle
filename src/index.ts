import './assets/style/style.scss';
import { GameModel } from './model/game.model';

const model = new GameModel();

const startGame = async () => {
    const a = await model.startGame();
    
}
startGame();

