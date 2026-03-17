type apiData = {
    title: string,
    description: string,
    price: number,
    images: string[],
    category: category,
}

type category = {
    slug: String;
    name: String;
    url: String;
}

type itemData = {
    title: string,
    description: string,
    price: number,
    image: string,
    category: category,
    amount: number
}

export default class Item {

    public title: string;
    public description: string;
    public price: number;
    public image: string;

    public addToCartCallback: (self: Item) => void;

    constructor(
        productData: apiData, 
        addToCartCallback: (self: Item) => void
    ) {
        this.title = productData.title
        this.description = productData.description
        this.price = productData.price
        this.image = productData.images[0]

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