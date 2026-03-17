import { Header, Main, Footer } from './components/components-body.ts'

export default class App {

    public headerEl: Element;
    public mainEl: Element;
    public footerEl: Element;
    
    public header: Header;
    public main: Main;
    public footer: Footer;

    constructor(
        headerEl: Element, 
        mainEl: Element, 
        footerEl: Element
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
