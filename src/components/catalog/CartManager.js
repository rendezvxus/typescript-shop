import Cart from './entity/Cart.js'
import Item from './entity/Item.js'

export default class CartManager {
    constructor(cartEntity) {
        this.cart = cartEntity

        this.itemsInCart = []
    }

    addToCart(item) {
        const itemInfo = this.itemsInCart.find(obj => {console.log(item.title, obj.title); return item.title == obj.title})
        if  (itemInfo) {
            itemInfo.amount += 1
            this.cart.updateCount(item, itemInfo.amount)
        } else {
            const itemInfo = this.buildItemInfo(item)
            this.itemsInCart.push(itemInfo)
            this.cart.addItem(item, (item) => { this.removeItem(item) })
        }

        const totalPrice = this.getTotalPrice()
        this.cart.updateTotal(totalPrice)
    }

    removeItem(item) {
        
    }

    getTotalPrice() {
        return this.itemsInCart.map(obj => obj.price * obj.amount).reduce((a,b) => a + b)
    }

    buildItemInfo(item) {
        return {
            title: item.title,
            price: item.price,
            amount: 1
        }
    }
}