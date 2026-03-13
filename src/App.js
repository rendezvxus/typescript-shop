import { Header, Main, Footer } from '@/components/components-body.js'

class App {
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
        this.main = new Header(this.mainEl)
        this.footer = new Header(this.footerEl)
    }
}