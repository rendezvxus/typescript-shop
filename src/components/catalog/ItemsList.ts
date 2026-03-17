export default class ItemsList {

    public parentContainer: Element;

    public wrapper: Element;
    public itemsContainer: Element;

    constructor(
        parentContainer: Element
    ) {
        this.parentContainer = parentContainer;
        // this.itemsContainer = null
        // this.showMoreButton = null

        this.wrapper = this.createContainer()
        this.itemsContainer = this.createContainer() 
    }

    render() {
        this.wrapper.appendChild(this.itemsContainer)
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

    // appendItems(items) {
    //     const itemsElements = items.map(item => item.render())
    //     this.itemsContainer.append(...itemsElements)
    // }

    // createShowMore(addMoreCardsCallback) {
    //     const button = document.createElement('button')
    //     button.classList.add('show-more-btn')
    //     button.type = 'get'
    //     button.innerHTML = `show more`

    //     button.addEventListener('click', (e) => {
    //         addMoreCardsCallback()
    //     })

    //     this.wrapper.appendChild(button)
    //     this.showMoreButton = button
    // }

    // flushItems() {
    //     this.itemsContainer.innerHTML = ``
    // }
}
