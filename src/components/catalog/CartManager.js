import Cart from './entity/Cart.js'
import Item from './entity/Item.js'

export default class CartManager {
    constructor(cartEntity) {
        this.cart = cartEntity

        this.itemsInCart = []
    }

    addToCart(item) {
        const itemInfo = this.itemsInCart.find(obj => item.title == obj.title)
        if  (itemInfo) {
            itemInfo.amount += 1
            this.cart.updateCount(item, itemInfo.amount)
        } else {
            const itemInfo = this.buildItemInfo(item)
            this.itemsInCart.push(itemInfo)
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

    buildItemInfo(item) {
        return {
            title: item.title,
            price: item.price,
            amount: 1
        }
    }

    updateTotal() {
        const totalPrice = this.getTotalPrice()
        const priceRoundUp = totalPrice == 0 ? totalPrice : totalPrice.toFixed(2);
        this.cart.updateTotal(priceRoundUp)
    }

    checkoutItems() {
        console.log(this.itemsInCart)

        this.itemsInCart = []
        this.cart.checkout()
        this.updateTotal()
    }
}