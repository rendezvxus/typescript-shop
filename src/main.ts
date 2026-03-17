import './style.scss'
import App from './App.ts'

const getHtmlElement = (selector: string) => {
    const element = document.querySelector<HTMLElement>(selector)
    if (!element) {
        throw new Error(`${selector} element not found.`)
    }
    return element
}

document.addEventListener("DOMContentLoaded", () => {
        const header = getHtmlElement('#header')
        const main = getHtmlElement('#main')
        const footer = getHtmlElement('#footer')

        if (header && main && footer) {
            const app = new App(header, main, footer)
            app.init()
        }        
    }
)
