import ItemsList from '../catalog/ItemsList.js'
import CartManager from '../catalog/CartManager.js'
import Filter from '../catalog/Filter.js'
import Cart from '../catalog/entity/Cart.js'
import Item from '../catalog/entity/Item.js'

export default class Main {
    constructor(mainEl) {
        this.mainComponent = mainEl

        this.items = []

        this.itemList = null
        this.cart = null
        this.filter = null

        this.cartManager = null
    }

    init() {
        this.itemList = new ItemsList(this.mainComponent)
        this.cart = new Cart(this.mainComponent, () => { this.checkoutItems() })
        this.filter = new Filter(this.mainComponent, (args) => this.filterItems(args))
        this.cartManager = new CartManager(this.cart)

        this.itemList.createContainer()
        this.itemList.createShowMore(() => {this.renderMoreCards() })
        this.cart.createContainer()
        this.filter.createContainer()

        this.itemList.render()
        this.cart.render()
        this.filter.render()

        this.cartManager.init()

        const INITIAL_CARDS_AMOUNT = 6
        this.generateItems(INITIAL_CARDS_AMOUNT)
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

    flushItemCards() {
        this.items = []
        this.itemList.flushItems()    
    }

    generateItems(limit, skip = 0, category) {

        const url = this.constructUrl(limit,skip,category)
        fetch(url)
            .then(response => response.json())
            .then(jsonData => {
                const products = jsonData.products
                this.handleProducts(products) 
            })
    }

    constructUrl(limit, skip = 0, category = {}) {
        const url = `
            https://dummyjson.com/products${category.slug ? '/category/'+category.slug : ''}?limit=${limit}${skip ? '&skip='+skip : ''}&select=title,description,price,images,category
        `
        console.log(url)
        return url
    }

    filterItems(category) {
        this.flushItemCards()
        this.generateItems(0, 0 , category)
    }

}
