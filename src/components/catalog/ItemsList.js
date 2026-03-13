export default class ItemsList {
    constructor(parentContainer) {
        this.parentContainer = parentContainer
    }

    render() {
        const itemsListComponent = document.createElement('div')
        itemsListComponent.classList.add('itemsList')

        this.parentContainer.appendChild(itemsListComponent)
    }
}