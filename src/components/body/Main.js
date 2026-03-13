import ItemsList from '../catalog/ItemsList.js'
import Cart from '../catalog/entity/Cart.js'

export default class Main {
    constructor(mainEl) {
        this.mainComponent = mainEl
    }

    render() {
        // create itemList element
        const itemList = new ItemsList(this.mainComponent)
        itemList.render()

        // create cart element
        const cart = new Cart(this.mainComponent)
        cart.render()
    }
}
