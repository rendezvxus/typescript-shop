export default class Cart {
    constructor(parentContainer) {
        this.parentContainer = parentContainer
    }

    render() {
        const itemsListComponent = document.createElement('div')
        itemsListComponent.classList.add('cart')

        this.parentContainer.appendChild(itemsListComponent)
    }
}