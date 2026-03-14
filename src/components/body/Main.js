import ItemsList from '../catalog/ItemsList.js'
import Cart from '../catalog/entity/Cart.js'
import CartManager from '../catalog/CartManager.js'
import Item from '../catalog/entity/Item.js'
export default class Main {
    constructor(mainEl) {
        this.mainComponent = mainEl

        this.items = []

        this.itemList = null
        this.cart = null

        this.cartManager = null
    }

    init() {
        this.itemList = new ItemsList(this.mainComponent)

        fetch('https://dummyjson.com/products?limit=6&select=title,description,price,images')
            .then(response => response.json())
            .then(jsonData => {
                const products = jsonData.products
                this.handleProducts(products) 
            })

        this.cart = new Cart(this.mainComponent, () => { this.checkoutItems() })
        this.cartManager = new CartManager(this.cart)
        
        this.itemList.createContainer().render()
        this.cart.createContainer().render()

        this.itemList.createShowMore(() => {this.renderMoreCards()})
    }

    handleProducts(products) {
        this.items = products.map(datum => new Item(datum, (item) => {this.addToCart(item)}))
        this.itemList.appendItems(this.items)
    }

    addToCart(item) {
        this.cartManager.addToCart(item)
    }

    checkoutItems() {
        this.cartManager.checkoutItems()
    }

    renderMoreCards() {
        alert('LOADING MORE CARDS')
    }
}
