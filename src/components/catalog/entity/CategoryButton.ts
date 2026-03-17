import type { apiData, category, itemData } from '../../common-types.ts';

export default class FilterButton {

    public parentContainer: Element;
    public selfElement: Element;

    public category: category;
    public clickCallback: (category: category) => void;

    constructor(
        parentContainer: Element, 
        category: category, 
        clickCallback: (category: category) => void
    ) {
        this.parentContainer = parentContainer
        this.category = category
        this.clickCallback = clickCallback

        this.selfElement = this.buildButton()
    }

    buildButton() {
        const button = document.createElement('label')
        button.classList.add('category-button')
        button.innerHTML = `${this.category.name}`

        const checkbox = document.createElement('input')
        checkbox.classList.add('switch')
        checkbox.type = 'checkbox'

        button.appendChild(checkbox)

        checkbox.addEventListener('change', () => {
            this.clickCallback(this.category)
        })
        
        return button
    }

    render() {
        this.parentContainer.appendChild(this.selfElement)
    }
}