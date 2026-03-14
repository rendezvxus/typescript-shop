export default class FilterButton {
    constructor(parentContainer, category) {
        this.parentContainer = parentContainer
        this.category = category

        this.selfElement = null
    }

    buildButton() {
        const button = document.createElement('button')
        button.classList.add('category-button')
        button.innerHTML = `${this.category.name}`

        button.addEventListener('click', (e) => {

        })
        
        return button
    }

    render() {
        const selfElement = this.buildButton()
        this.selfElement = selfElement

        this.parentContainer.appendChild(this.selfElement)
    }
}