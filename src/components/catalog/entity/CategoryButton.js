export default class FilterButton {
    constructor(parentContainer, category, clickCallback) {
        this.parentContainer = parentContainer
        this.category = category
        this.clickCallback = clickCallback

        this.selfElement = null
    }

    buildButton() {
        const button = document.createElement('label')
        button.classList.add('category-button')
        button.innerHTML = `${this.category.name}`

        const checkbox = document.createElement('input')
        checkbox.classList.add('switch')
        checkbox.type = 'checkbox'

        button.appendChild(checkbox)

        checkbox.addEventListener('change', (e) => {
            this.clickCallback(this.category)
        })
        
        return button
    }

    render() {
        const selfElement = this.buildButton()
        this.selfElement = selfElement

        this.parentContainer.appendChild(this.selfElement)
    }
}