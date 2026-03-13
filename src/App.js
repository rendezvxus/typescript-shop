import { Header, Main, Footer } from '@/components/components-body.js'

export default class App {
    constructor(headerEl, mainEl, footerEl) {
        this.headerEl = headerEl
        this.mainEl = mainEl
        this.footerEl = footerEl
        
        this.header = null
        this.main = null
        this.footer = null
    }

    init() {
        this.header = new Header(this.headerEl)
        this.main = new Main(this.mainEl)
        this.footer = new Footer(this.footerEl)

        this.header.render()
        this.main.render()
        // Get cart items
        // create items and save them in manager

    }
}
