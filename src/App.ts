import { Header, Main, Footer } from './components/components-body.ts'

export default class App {

    private headerEl: Element;
    private mainEl: Element;
    private footerEl: Element;
    
    private header: Header;
    private main: Main;
    private footer: Footer;

    constructor(
        headerEl: HTMLElement, 
        mainEl: HTMLElement, 
        footerEl: HTMLElement
    ) {
        this.headerEl = headerEl
        this.mainEl = mainEl
        this.footerEl = footerEl

        this.header = new Header(this.headerEl)        
        this.main = new Main(this.mainEl)
        this.footer = new Footer(this.footerEl)
    }

    init() {
        this.header.render()
        this.main.init()
        this.footer.render()
    }
}
