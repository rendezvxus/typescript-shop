import Item from './entity/Item.ts'

export default class ItemsList {

    private parentContainer: Element;

    private wrapper: Element;
    private itemsContainer: Element;

    private showMoreButton: HTMLButtonElement;

    constructor(
        parentContainer: Element
    ) {
        this.parentContainer = parentContainer;
        this.wrapper = this.createWrapper()
        this.itemsContainer = this.createContainer() 
        this.showMoreButton = this.createShowMoreButton()
    }

    render() {
        this.wrapper.append(
            this.itemsContainer, 
            this.showMoreButton
        )
        this.parentContainer.appendChild(this.wrapper)
    }

    createWrapper(): Element {
        const wrapper: Element = document.createElement('div')
        wrapper.classList.add('itemsList-wrapper')
        return wrapper
    }

    createContainer(): Element {
        const itemsContainer = document.createElement('div')
        itemsContainer.classList.add('itemsList')
        return itemsContainer
    }

    createShowMoreButton(): HTMLButtonElement {
        const button = document.createElement('button')
        button.classList.add('show-more-btn')
        button.type = 'button'
        button.innerHTML = `show more`

        return button
    }

    appendItems(items: Item[]) {
        const itemsElements = items.map(item => item.render())
        this.itemsContainer.append(...itemsElements)
    }

    showMoreInit(addMoreCardsCallback: () => void) {
        this.showMoreButton.addEventListener('click', () => {
            addMoreCardsCallback()
        })
    }

    flushItems() {
        this.itemsContainer.innerHTML = ``
    }
}
