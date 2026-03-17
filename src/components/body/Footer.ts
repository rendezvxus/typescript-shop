export default class Footer {

    private parentContainer: Element

     constructor(parentContainer: Element) {
        this.parentContainer = parentContainer
    }

    render() {
        this.parentContainer.innerHTML = `
            <p>© 2020-2026, made with </p>
            <img class="footer-heart" src="/Heart.svg"/>
            <p> by </p>
            <a href="https://vistegra.by/">Vistegra</a>
        `
    }
}