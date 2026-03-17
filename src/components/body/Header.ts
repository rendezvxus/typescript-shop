export default class Header {

    public parentContainer: Element

    constructor(parentContainer: Element) {
        this.parentContainer = parentContainer
    }

    render() {
        const headerWrapper = this.buildWrapper()
        const logo = this.buildLogo()
        const pageName = this.buildPageName()
        
        headerWrapper.append(logo, pageName)
        this.parentContainer.appendChild(headerWrapper)
    }

    buildLogo() {
        const logoImgWrapper = document.createElement('div')
        logoImgWrapper.classList.add('logo-img-wrapper')

        const logoImgElement = document.createElement('img')
        logoImgElement.src = '/V.svg'

        const logoOverlappingText = document.createElement('a')
        logoOverlappingText.classList.add('logo-img-text-container')
        logoOverlappingText.innerHTML = `VISTEGRA`

        logoImgWrapper.append(logoImgElement, logoOverlappingText)

        return logoImgWrapper
    }

    buildWrapper() {
        const headerWrapper = document.createElement('div')
        headerWrapper.classList.add('header-wrapper')

        return headerWrapper
    }

    buildPageName() {
        const pageNameElement = document.createElement('h1')
        pageNameElement.classList.add('header-pagename')
        pageNameElement.innerHTML = `- Shop` 

        return pageNameElement
    }
}