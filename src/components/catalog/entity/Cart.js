export default class Cart {
    constructor(parentContainer) {
        this.parentContainer = parentContainer

        this.container = null
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
        return body
    }

    buildFooter() {
        const footer = document.createElement('div')
        footer.classList.add('cart-footer')
        footer.innerHTML = `<p>Total: 0$</p>`

        const checkoutButton = document.createElement('button')
        checkoutButton.classList.add('cart-checkout-btn')
        checkoutButton.type = 'button'
        checkoutButton.innerHTML = `CHECKOUT`

        footer.appendChild(checkoutButton)
        return footer
    }
}