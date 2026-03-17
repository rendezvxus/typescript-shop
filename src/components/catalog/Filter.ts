import CategoryButton from './entity/CategoryButton.ts'

import type { apiData, category, itemData } from '../common-types.ts';

export default class Filter {

    public parentContainer: Element;
    public container: Element;
    
    public applyFilterCallback: (category: category) => void;
    
    public categories: category[] = [];

    constructor(
        parentContainer: Element, 
        applyFilterCallback: (category: category) => void
    ) {
        this.parentContainer = parentContainer
        this.container = this.createContainer()

        this.applyFilterCallback = applyFilterCallback
    }

    createContainer() {
        const container = document.createElement('div')
        container.classList.add('filter-container')
        return container
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
                (category: category) => {this.applyFilterCallback(category)}
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
}
