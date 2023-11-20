import { ArrowDirection, MoveVariable, NeighborsDataType } from '../../../model/game.interfaces';
import { Component } from '../../../utile/component';

export class ControlButtons extends Component {
    private topButton: Component;
    private bottomButton: Component;
    private leftButton: Component;
    private rightButton: Component;
    private buttonsSet: Component[];

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
        this.buttonsSet = [this.leftButton, this.rightButton, this.topButton, this.bottomButton];
    }

    addOnClickHandler(onClick: (direction: ArrowDirection) => void) {
        this.leftButton.node.onclick = () => onClick(ArrowDirection.left);
        this.rightButton.node.onclick = () => onClick(ArrowDirection.right);
        this.topButton.node.onclick = () => onClick(ArrowDirection.up);
        this.bottomButton.node.onclick = () => onClick(ArrowDirection.down);
    }

    disableButton(neighbors: NeighborsDataType) {
        this.leftButton.node.classList[neighbors.right.index === -1 ? 'add' : 'remove']('disable-button');
        this.rightButton.node.classList[neighbors.left.index === -1 ? 'add' : 'remove']('disable-button');
        this.topButton.node.classList[neighbors.bottom.index === -1 ? 'add' : 'remove']('disable-button');
        this.bottomButton.node.classList[neighbors.top.index === -1 ? 'add' : 'remove']('disable-button');
    }

    destroy(): void {
        this.buttonsSet.forEach(button => button.node.onclick = null);
        super.destroy();
    }
}