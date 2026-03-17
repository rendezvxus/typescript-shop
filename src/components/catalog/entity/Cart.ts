import Item from '../entity/Item.ts'

import type { apiData, itemData, category } from '../../common-types.ts'

export default class Cart {

    public parentContainer: Element;
    public checkoutCallback: () => void;

    public container: Element;
    public body: Element;
    public totalPriceElement: Element;

    public itemElements: {[key: string]: Element};

    public removeItemCallback: (itemData: itemData) => void;
    public totalPrice: string | number;

    constructor(
        parentContainer: Element, 
        checkoutCallback: () => void,
        removeItemCallback: (item: itemData) => void
    ) {
        this.parentContainer = parentContainer
        this.checkoutCallback = checkoutCallback

        this.body = this.buildBody();
        this.totalPriceElement = this.buildTotalPriceElement();
        this.container = this.buildContainer();
        
        this.itemElements = {};

        this.removeItemCallback = removeItemCallback

        this.totalPrice = 0
    }

    render() {
        this.parentContainer.appendChild(this.container)
    }

    buildContainer(): HTMLDivElement {
        const container = document.createElement('div')
        container.classList.add('cart')

        const header = this.buildHeader()
        const footer = this.buildFooter()

        container.append(header, this.body, footer)

        return container
    }

    buildHeader(): HTMLDivElement {
        const header = document.createElement('div')
        header.classList.add('cart-header')
        header.innerHTML = `<p>CART</p>`
        return header
    }

    buildBody(): HTMLDivElement {
        const body = document.createElement('div')
        body.classList.add('cart-body')

        return body
    }

    buildFooter(): HTMLDivElement {
        const footer = document.createElement('div')
        footer.classList.add('cart-footer')

        const checkoutButton = this.buildCheckoutButton()

        footer.append(this.totalPriceElement,checkoutButton)
        return footer
    }

    buildTotalPriceElement(): Element {
        const totalPriceElement = document.createElement('p')
        totalPriceElement.innerHTML = `<p>Total: 0$</p>`

        return totalPriceElement
    }

    buildCheckoutButton(): HTMLButtonElement {
        const checkoutButton = document.createElement('button')
        checkoutButton.classList.add('cart-checkout-btn')
        checkoutButton.type = 'button'
        checkoutButton.innerHTML = `CHECKOUT`

        checkoutButton.addEventListener('click', () => {
            this.checkoutCallback()
        })

        return checkoutButton
    }

    addItem(
        itemData: itemData
    ) {
        const itemElement = this.renderItem(itemData)

        this.itemElements[itemData.title] = itemElement
        this.body.appendChild(itemElement)
    }

    updateCount(itemData: itemData) {
        const itemTitle = itemData.title
        const itemElement = this.itemElements[itemTitle]
        if (itemElement) {
            this.buildElementHTML(itemElement, itemData)
        }
    }

    renderItem(
        itemData: itemData
    ) {
        const itemElement = document.createElement('div')
        itemElement.classList.add('cart-item')
        this.buildElementHTML(itemElement, itemData)
        
        return itemElement
    }

    updateTotal(totalPrice: string | number) {
        this.totalPrice = totalPrice
        this.totalPriceElement.innerHTML = `<p>Total: ${this.totalPrice}$</p>`
    }

    buildElementHTML(
        itemElement: Element, 
        itemData: itemData
    ) {
        itemElement.innerHTML = `
            <img class="cart-item-image" src="${itemData.image}"/>
            <div class="cart-item-info">
                <p>${itemData.title}</p>
                <h3>${itemData.price}$ x ${itemData.amount || 1}</h3>
            </div>
        `
        const removeButton = document.createElement('button')
        removeButton.innerHTML = `<img class="cart-item-image" src="/Cross.svg"/>`
        removeButton.addEventListener('click', () => {  
            const itemTitle = itemData.title
            const itemElement = this.itemElements[itemTitle]

            if(itemElement) {
                itemElement.remove()
                delete this.itemElements[itemTitle]
            }

            if (this.removeItemCallback) {
                this.removeItemCallback(itemData)
            }
        })

        itemElement.appendChild(removeButton)
    }

    checkout() {
        this.body.innerHTML = ``
        this.itemElements = {}
    }
}