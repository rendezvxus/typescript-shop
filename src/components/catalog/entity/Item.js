export default class Item {
    constructor({title, description, price, images}, addToCartCallback) {
        this.title = title
        this.description = description
        this.price = price
        this.image = this.resolveItemImageUrl(images[0])

        this.addToCartCallback = addToCartCallback
    }

    render() {
        const itemElement = document.createElement('div')
        itemElement.classList.add('item')
        itemElement.innerHTML = `
            <img class="item-img" src="${this.image}"/>
            <div class="item-name-container">
                <h1>${this.title}</h1>
            </div>
            <div class="item-desc-container">
                <p>${this.description}</p>
            </div> 
        `
        const footer = this.buildFooter()
        itemElement.appendChild(footer)

        return itemElement
    }

    resolveItemImageUrl(url) {
        return url.slice(0, -1)
    }

    buildFooter() {
        const footer = document.createElement('div')
        footer.classList.add('item-footer')

        const addToCartButton = document.createElement('button')
        addToCartButton.classList.add('item-add-to-cart')
        addToCartButton.type = 'button'

        addToCartButton.innerHTML = `
            <img class="cart-img" src="/Cart.svg"/>
        `
        addToCartButton.addEventListener('click',(e) => {
            this.addToCartCallback(this)
        })

        footer.innerHTML = `
            <h2>${this.price} $</h2>
        `
        footer.appendChild(addToCartButton)
        return footer
    }
}