export default class Item {
    constructor({title, description, price, images}) {
        this.title = title
        this.description = description
        this.price = price
        this.image = this.resolveItemImageUrl(images[0])
    }

    render() {
        const itemElement = document.createElement('div')
        itemElement.classList.add('item')
        itemElement.innerHTML = `
            <img class="item-img" src= ${this.image}/>
            <div class="item-name-container">
                <h1>${this.title}</h1>
            </div>
            <div class="item-desc-container">
                <p>${this.description}</p>
            </div>
            <div class="item-footer">
                <h2>${this.price} $</h2>
            </div> 
        `
        return itemElement
    }

    resolveItemImageUrl(url) {
        return url.slice(0, -1)
    }
}