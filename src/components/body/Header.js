export default class Header {
    constructor(headerEl) {
        this.headerComponent = headerEl
    }

    render() {
        const logoContainer = this.buildContainer()
        const logo = this.buildLogo()
        const pageName = this.buildPageName()
        
        logoContainer.append(logo, pageName)
        this.headerComponent.appendChild(logoContainer)
    }

    buildLogo() {
        const logoImgWrapper = document.createElement('div')
        logoImgWrapper.classList.add('logo-img-wrapper')

        const logoImgElement = document.createElement('img')
        logoImgElement.src = '$/V.svg'

        const logoOverlappingText = document.createElement('a')
        logoOverlappingText.classList.add('logo-img-text-container')
        logoOverlappingText.innerHTML = `VISTEGRA`

        logoImgWrapper.append(logoImgElement, logoOverlappingText)

        return logoImgWrapper
    }

    buildContainer() {
        const logoContainer = document.createElement('div')
        logoContainer.classList.add('logo-container')

        return logoContainer
    }

    buildPageName() {
        const pageNameElement = document.createElement('h1')
        pageNameElement.classList.add('header-pagename')
        pageNameElement.innerHTML = `- Shop` 

        return pageNameElement
    }
}