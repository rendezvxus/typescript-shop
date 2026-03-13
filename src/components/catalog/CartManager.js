import Cart from './entity/Cart.js'
import Item from './entity/Item.js'

export default class CartManager {
    constructor(cartEntity) {
        this.cart = cartEntity
    }
}