export default class Cart {
    constructor(parentContainer) {
        this.parentContainer = parentContainer
        this.container = null
        this.body = null

        this.itemElements = {}
        this.totalPriceElement = null
    }

    render() {
        const header = this.buildHeader()
        const body = this.buildBody()
        const footer = this.buildFooter()

        this.container.append(header,body,footer)

        this.parentContainer.appendChild(this.container)
    }

    createContainer() {
        this.container = document.createElement('div')
        this.container.classList.add('cart')
        return this
    }

    buildHeader() {
        const header = document.createElement('div')
        header.classList.add('cart-header')
        header.innerHTML = `<p>CART</p>`
        return header
    }

    buildBody() {
        const body = document.createElement('div')
        body.classList.add('cart-body')

        this.body = body

        return body
    }

    buildFooter() {
        const footer = document.createElement('div')
        footer.classList.add('cart-footer')

        this.totalPriceElement = document.createElement('p')
        this.totalPriceElement.innerHTML = `<p>Total: 0$</p>`

        const checkoutButton = document.createElement('button')
        checkoutButton.classList.add('cart-checkout-btn')
        checkoutButton.type = 'button'
        checkoutButton.innerHTML = `CHECKOUT`

        footer.append(this.totalPriceElement,checkoutButton)
        return footer
    }

    addItem(item, removeSelfCallback) {
        this.removeSelfCallback = removeSelfCallback
        const itemElement = this.renderItem(item)
        this.itemElements[item.title] = itemElement
        this.body.appendChild(itemElement)
    }

    updateCount(item, count) {
        const itemTitle = item.title
        const itemElement = this.itemElements[itemTitle]
        if (itemElement) {
            this.buildElementHTML(itemElement, item, count)
        }
    }

    renderItem(item) {
        const itemElement = document.createElement('div')
        itemElement.classList.add('cart-item')
        this.buildElementHTML(itemElement, item)
        
        return itemElement
    }

    updateTotal(totalPrice) {
        this.totalPrice = totalPrice
        this.totalPriceElement.innerHTML = `<p>Total: ${this.totalPrice}$</p>`
    }

    buildElementHTML(itemElement, item, count = 1) {
        itemElement.innerHTML = `
            <img class="cart-item-image" src="${item.image}"/>
            <div class="cart-item-info">
                <p>${item.title}</p>
                <p>${item.price}$ x ${count}</p>
            </div>
        `
        const removeButton = document.createElement('button')
        removeButton.innerHTML = `<img class="cart-item-image" src="/Cross.svg"/>`
        removeButton.addEventListener('click', (e) => {  
            const itemTitle = item.title
            const itemElement = this.itemElements[itemTitle]

            if(itemElement) {
                itemElement.remove()
                delete this.itemElements[itemTitle]
            }

            if (this.removeSelfCallback) {
                this.removeSelfCallback(item)
            }
        })

        itemElement.appendChild(removeButton)
    }

}