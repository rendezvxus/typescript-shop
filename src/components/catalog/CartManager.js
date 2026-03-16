import Cart from './entity/Cart.js'
import Item from './entity/Item.js'
import LocalStorageManager from '../localStorageManager.js'

export default class CartManager {
    constructor(cartEntity) {
        this.cart = cartEntity
        this.itemsInCart = []

        this.storageManager = null;
    }

    init() {
        this.initStorage()
        const data = this.getStorageData()
        if (data) {
            data.forEach(item => {
                this.addToCart(item, true)
            })
            this.updateTotal()
        }
    }

    addToCart(item, fromStorage = false) {

        if (fromStorage) {
            this.itemsInCart.push(item)
            this.cart.addItem(item, (item) => { this.removeItem(item) })
            return
        }

        const itemInfo = this.itemsInCart.find(obj => item.title == obj.title)
        
        if (itemInfo) { 
            itemInfo.amount += 1
            this.cart.updateCount(itemInfo)
        } else {      
            if (!item.amount) {
                this.addItemCount(item)
            }
            this.itemsInCart.push(item)
            this.cart.addItem(item, (item) => { this.removeItem(item) })
        }
        this.updateTotal()
    }

    removeItem(item) {
        this.itemsInCart = this.itemsInCart.filter(obj => obj.title !== item.title)
        this.updateTotal()
    }

    getTotalPrice() {
        const pricesArray = this.itemsInCart.map(obj => obj.price * obj.amount)
        return pricesArray[0] ? pricesArray.reduce((a,b) => a + b) : 0;
    }

    addItemCount(item) {
        item.amount = 1
        return item
    }

    updateTotal() {
        const totalPrice = this.getTotalPrice()
        const priceRoundUp = totalPrice == 0 ? totalPrice : totalPrice.toFixed(2);
        this.cart.updateTotal(priceRoundUp)
    }

    checkoutItems() {
        this.itemsInCart = []
        this.cart.checkout()
        this.updateTotal()
    }

    initStorage() {
        this.storageManager = new LocalStorageManager(() => this.getItemsInCart() )
        this.storageManager.init()
    }

    getStorageData() {
        return this.storageManager.getData()
    }

    getItemsInCart() {
        return this.itemsInCart
    }
}