export default class LocalStorageManager {
    constructor(onWindowCloseCallback) {
        this.storage = window.localStorage
        this.cartData = null

        this.onWindowCloseCallback = onWindowCloseCallback
    }

    init() {
        this.loadData()
        this.createOncloseListener()
        return this
    }

    getData() {
        return this.cartData ? this.cartData : []
    }

    loadData() {  
        const dataString = this.storage.getItem('cartData');
        if (typeof(dataString) !== undefined) {
            this.cartData = JSON.parse(dataString)
        }
    }

    saveData(data) {
        const jsonData = JSON.stringify(data)
        this.storage.setItem('cartData', jsonData)
    }

    createOncloseListener() {
        // learned about beforeunload event
        const self = this
        window.addEventListener('beforeunload', (e) => {
            alert("EVENT STARTED")
            const data = self.onWindowCloseCallback()
            self.saveData(data)
        })
    }
}    