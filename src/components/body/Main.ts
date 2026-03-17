import ItemsList from '../catalog/ItemsList.ts'
import CartManager from '../catalog/CartManager.ts'
// import Filter from '../catalog/Filter.js'
import Cart from '../catalog/entity/Cart.ts'
import Item from '../catalog/entity/Item.ts'

type apiData = {
    title: string,
    description: string,
    price: number,
    images: string[],
    category: category,
}

type itemData = {
    title: string,
    description: string,
    price: number,
    image: string,
    category: category,
    amount: number
}

type category = {
    slug: String;
    name: String;
    url: String;
}

export default class Main {

    public mainComponent: Element;

    public itemList: ItemsList;
    public cart: Cart;
    // public filter: Filter;
    public cartManager: CartManager;

    public items: Item[];

    constructor(
        mainEl: Element
    ) {
        this.mainComponent = mainEl

        this.itemList = new ItemsList(this.mainComponent)
        this.cart = new Cart(
            this.mainComponent,
            () => { this.checkoutItems() },
            (itemData: itemData) => this.removeFromCart(itemData)
        )
        // this.filter = null;
        this.cartManager = new CartManager(this.cart)

        this.items = [];
    }

    removeFromCart(itemData: itemData) {
        this.cartManager.removeItem(itemData)
    }

    init() {
        // this.filter = new Filter(this.mainComponent, (args) => this.filterItems(args))

        this.itemList.createContainer()
        this.itemList.showMoreInit(() => { this.renderMoreCards() })
        // this.filter.createContainer()

        this.itemList.render()
        this.cart.render()
        // this.filter.render()

        // this.cartManager.init()

        const INITIAL_CARDS_AMOUNT = 6
        this.generateItems(INITIAL_CARDS_AMOUNT)
    }

    handleProducts(products: apiData[]) {
        console.log(products)
        const newItemsArray = 
            products.map(datum => 
                new Item(
                    datum, 
                    (datum: itemData) => { this.addToCart(datum) }
                )
            )

        this.items = this.items.concat(newItemsArray)
        this.itemList.appendItems(newItemsArray)
    }


    addToCart(item: itemData) {
        this.cartManager.addToCart(item)
    }

    checkoutItems() {
        alert('silencer here')
    //     this.cartManager.checkoutItems()
    }

    renderMoreCards() {

        const MAX_ROWS_AMOUNT = 4
        const CARDS_IN_ROW = 3
        const rng = Math.random()

        const rowsToRequest = Math.ceil(rng * MAX_ROWS_AMOUNT)
        const requestLimit = rowsToRequest * CARDS_IN_ROW
        
        this.generateItems(requestLimit, this.items.length)
    }

    // flushItemCards() {
    //     this.items = []
    //     this.itemList.flushItems()    
    // }

    generateItems(
        limit = 6, 
        skip = 0, 
        category?: category
    ) {
        const url = this.constructUrl(limit,skip,category)
        fetch(url)
            .then(response => response.json())
            .then(jsonData => {
                const products = jsonData.products
                this.handleProducts(products) 
            })
    }

    constructUrl(
        limit = 6,
        skip = 0,
        category?: category
    ) {
        const url = `
        https://dummyjson.com/products${category ? '/category/' + category.slug : ''}?limit=${limit}${skip ? '&skip='+skip : ''}&select=title,description,price,images,category
        `
        console.log(url)
        return url
    }

    // filterItems(category) {
    //     this.flushItemCards()
    //     this.generateItems(0, 0 , category)
    // }

}
