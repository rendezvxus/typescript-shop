import CategoryButton from './entity/CategoryButton.js'

export default class Filter {
    constructor(parentContainer, applyFilterCallback) {
        this.parentContainer = parentContainer


        this.container = this.createContainer()
        this.categories = []

        this.applyFilterCallback = applyFilterCallback
    }

    createContainer() {
        this.container = document.createElement('div')
        this.container.classList.add('filter-container')
        return this
    }

    createWrapper() {
        const wrapper = document.createElement('div')
        wrapper.classList.add('filter-wrapper')
        return wrapper
    }

    async render() {
        this.categories = await this.getCategories()

        const wrapper = this.createWrapper()
        const categoryButtons = this.categories.map(category => 
            new CategoryButton(
                wrapper, 
                category, 
                (category) => {this.applyFilterCallback(category)}
            )
        )

        categoryButtons.forEach(button => button.render())

        this.container.appendChild(wrapper)
        this.parentContainer.prepend(this.container)
    }

    async getCategories() {
        const url = 'https://dummyjson.com/products/categories'
        return fetch(url)
            .then(response => response.json())
    }

    toggleFilter(category) {
        console.log("Toggled " + category.name)
        const index = this.filteredCategories.indexOf(category)
        if (index >= 0) {
            this.filteredCategories.splice(index, 1)
        } else {
            this.filteredCategories.push(category)
        }
    }

    getFilteredCaretgories() {
        return this.filteredCategories
    }
}