export default class ItemsList {
    constructor(parentContainer) {
        this.parentContainer = parentContainer

        this.container = null
    }

    render() {
        this.parentContainer.appendChild(this.container)
    }

    createContainer() {
        this.container = document.createElement('div')
        this.container.classList.add('itemsList')
        return this
    }

    appendItems(items) {
        const itemsElements = items.map(item => item.render())
        this.container.append(...itemsElements)
    }
}