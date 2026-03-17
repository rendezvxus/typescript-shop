import Cart from './entity/Cart.ts'
import Item from './entity/Item.ts'
// import LocalStorageManager from '../localStorageManager.js'

import type { apiData, itemData, category } from '../common-types.ts'

export default class CartManager {

    public cart: Cart;
    public itemsInCart: itemData[]

    // public storageManager: LocalStorageManager;

    constructor(cartEntity: Cart) {
        this.cart = cartEntity
        this.itemsInCart = []

        // this.storageManager = null;
    }

    init() {
        // this.initStorage()
        // const data = this.getStorageData()
        // if (data) {
        //     data.forEach(item => {
        //         this.addToCart(item, true)
        //     })
        //     this.updateTotal()
        // }
    }

    addFromStorage(itemData: itemData) {
        this.itemsInCart.push(itemData)
        this.cart.addItem(itemData)
    }

    addToCart(
        item: Item
    ) {

        const itemInfo = this.itemsInCart.find(obj => item.title == obj.title)

        if (itemInfo) { 
            itemInfo.amount += 1
            this.cart.updateCount(itemInfo)
        } else {

            const newItemInfo: itemData = this.buildItemDataFromItem(item)

            this.itemsInCart.push(newItemInfo)
            this.cart.addItem(newItemInfo)
        }
        this.updateTotal()
    }

    buildItemDataFromItem(item: Item): itemData {
         const newItemInfo: itemData = {
            title: item.title,
            description: item.description,
            price: item.price,
            image: item.image,
            category: item.category,
            amount: 1
        }
        return newItemInfo
    }

    removeItem(item: itemData) {
        this.itemsInCart = this.itemsInCart.filter(obj => obj.title !== item.title)
        this.updateTotal()
    }

    getTotalPrice() {
        const pricesArray = this.itemsInCart.map(obj => obj.price * obj.amount)
        return pricesArray[0] ? pricesArray.reduce((a,b) => a + b) : 0;
    }

    // addItemCount(item) {
    //     item.amount = 1
    //     return item
    // }

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

    // initStorage() {
    //     this.storageManager = new LocalStorageManager(() => this.getItemsInCart() )
    //     this.storageManager.init()
    // }

    // getStorageData() {
    //     return this.storageManager.getData()
    // }

    // getItemsInCart() {
    //     return this.itemsInCart
    // }
}