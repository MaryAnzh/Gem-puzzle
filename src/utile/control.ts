
type atrType = {
    name: string,
    value: string,
}

export class Control {
    public node;

    constructor(parentNode: HTMLElement | null, tagName: string, className: string | string[], content: string = '', atr?: atrType[]) {
        const element = document.createElement(tagName);
        
        if (Array.isArray(className)) {
            className.forEach(name => element.classList.add(name));
        }
        if (typeof className === 'string') {
            element.className = className;
        }

        element.textContent = content;
        
        if (parentNode) {
            parentNode.append(element);
        }

        if (atr) {
            atr.forEach(el => element.setAttribute(el.name, el.value));
        }

        this.node = element;
    }

    destroy() {
        this.node.remove();
    }
}