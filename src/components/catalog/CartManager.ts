import Cart from './entity/Cart.ts'
import Item from './entity/Item.ts'
import LocalStorageManager from '../localStorageManager.ts'

import type { itemData } from '../common-types.ts'

export default class CartManager {

    private cart: Cart;

    private itemsInCart: itemData[]

    private storageManager: LocalStorageManager;

    constructor(cartEntity: Cart) {
        this.cart = cartEntity

        this.itemsInCart = []

        this.storageManager = new LocalStorageManager(() => this.getItemsInCart() )

    }

    init() {
        this.storageManager.init()
        const data = this.getStorageData()
        if (data) {
            data.forEach(item => {
                this.addFromStorage(item)
            })
            this.updateTotal()
        }
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

    getStorageData(): itemData[] {
        return this.storageManager.getData()
    }

    getItemsInCart(): itemData[] {
        return this.itemsInCart
    }
}