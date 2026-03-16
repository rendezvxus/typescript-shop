export default class Footer {
     constructor(footerEl) {
        this.container = footerEl
    }

    render() {
        this.container.innerHTML = `
            <p>© 2020-2026, made with </p>
            <img class="footer-heart" src="/Heart.svg"/>
            <p> by </p>
            <a href="https://vistegra.by/">Vistegra</a>
        `
    }
}