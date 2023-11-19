import { ArrowDirection } from '../../../model/game.interfaces';
import { Component } from '../../../utile/component';

export class ControlButtons extends Component {
    private topButton: Component;
    private bottomButton: Component;
    private leftButton: Component;
    private rightButton: Component;

    constructor(parent: HTMLElement) {
        super(parent, 'div', 'control-buttons');

        this.topButton = new Component(this.node, 'button', 'control-buttons__top');
        this.topButton.node.innerHTML = `<i class="fa-solid fa-arrow-up"></i>`

        this.bottomButton = new Component(this.node, 'button', 'control-buttons__bottom');
        this.bottomButton.node.innerHTML = `<i class="fa-solid fa-arrow-down"></i>`;

        this.leftButton = new Component(this.node, 'button', 'control-buttons__left');
        this.leftButton.node.innerHTML = `<i class="fa-solid fa-arrow-left"></i>`;

        this.rightButton = new Component(this.node, 'button', 'control-buttons__right');
        this.rightButton.node.innerHTML = `<i class="fa-solid fa-arrow-right"></i>`;
    }

    addOnClickHandler(onClick: (direction: ArrowDirection) => void) {
        this.leftButton.node.onclick = () => onClick(ArrowDirection.left);
        this.rightButton.node.onclick = () => onClick(ArrowDirection.right);
        this.topButton.node.onclick = () => onClick(ArrowDirection.up);
        this.bottomButton.node.onclick = () => onClick(ArrowDirection.down);
    }

    destroy(): void {
        this.leftButton.node.onclick = null;
        this.rightButton.node.onclick = null;
        this.topButton.node.onclick = null;
        this.bottomButton.node.onclick = null;
    }
}