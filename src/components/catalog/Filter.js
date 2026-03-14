import CategoryButton from './entity/CategoryButton.js'

export default class Filter {
    constructor(parentContainer) {
        this.parentContainer = parentContainer
        this.container = this.createContainer()

        this.categories = []
        this.categoryButtons = []

        this.addCategoryCallback = null
    }

    createContainer() {
        this.container = document.createElement('div')
        this.container.classList.add('filter-container')
        return this
    }

    async render() {
        const categories = await this.getCategories()
        this.categories = categories

        this.categoryButtons = this.categories.map(category => new CategoryButton(this.container, category))
        this.categoryButtons.forEach(button => button.render())
        
        this.parentContainer.prepend(this.container)
    }

    async getCategories() {
        const url = 'https://dummyjson.com/products/categories'
        return fetch(url)
            .then(response => response.json())
    }

    buildButton(category) {
        const button = document.createElement('button')
        button.classList.add('category-button')
        button.innerHTML = `${category}`

        button.addEventListener('click', (e) => {
            this.addCategoryCallback
        })
        
        return button
    }
}