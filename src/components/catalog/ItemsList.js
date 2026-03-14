export default class ItemsList {
    constructor(parentContainer) {
        this.parentContainer = parentContainer
        this.itemsContainer = null
        this.showMoreButton = null
    }

    render() {
        this.parentContainer.appendChild(this.wrapper)
    }

    createContainer() {
        this.wrapper = document.createElement('div')
        this.wrapper.classList.add('itemsList-wrapper')

        this.itemsContainer = document.createElement('div')
        this.itemsContainer.classList.add('itemsList')

        this.wrapper.appendChild(this.itemsContainer)
        return this
    }

    appendItems(items) {
        const itemsElements = items.map(item => item.render())
        this.itemsContainer.append(...itemsElements)
    }

    createShowMore(addMoreCardsCallback) {
        const button = document.createElement('button')
        button.classList.add('show-more-btn')
        button.type = 'get'
        button.innerHTML = `show more`

        button.addEventListener('click', (e) => {
            addMoreCardsCallback()
        })

        this.wrapper.appendChild(button)
        this.showMoreButton = button
    }
}
