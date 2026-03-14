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
        const INITIAL_CARDS_AMOUNT = 6

        this.itemList = new ItemsList(this.mainComponent)

        this.generateItems(INITIAL_CARDS_AMOUNT)

        this.cart = new Cart(this.mainComponent, () => { this.checkoutItems() })
        this.cartManager = new CartManager(this.cart)
        
        this.itemList.createContainer().render()
        this.cart.createContainer().render()

        this.itemList.createShowMore(() => {this.renderMoreCards() })
    }

    handleProducts(products) {
        const newItemsArray = 
            products.map(datum => 
                new Item(datum, (item) => { this.addToCart(item) })
            )
            
        this.items = this.items.concat(newItemsArray)
        this.itemList.appendItems(newItemsArray)
    }

    addToCart(item) {
        this.cartManager.addToCart(item)
    }

    checkoutItems() {
        this.cartManager.checkoutItems()
    }

    renderMoreCards() {
        const MAX_ROWS_AMOUNT = 4
        const CARDS_IN_ROW = 3
        const rng = Math.random()

        const rowsToRequest = Math.ceil(rng * MAX_ROWS_AMOUNT)
        const requestLimit = rowsToRequest * CARDS_IN_ROW
        
        this.generateItems(requestLimit, this.items.length)
    }

    generateItems(limit, skip = 0) {
        fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}&select=title,description,price,images`)
            .then(response => response.json())
            .then(jsonData => {
                const products = jsonData.products
                this.handleProducts(products) 
            })
    }
}
