import type { itemData } from './common-types.ts';

export default class LocalStorageManager {

    public storage: Storage = window.localStorage;
    public cartData: itemData[] = [];

    public onWindowCloseCallback: () => itemData[];

    constructor(
        onWindowCloseCallback: () => itemData[]
    ) {
        this.storage = window.localStorage
        this.onWindowCloseCallback = onWindowCloseCallback
    }

    init() {
        this.loadData()
        this.createOncloseListener()
    }

    getData() {
        return this.cartData ? this.cartData : []
    }

    loadData() {  
        const dataString = this.storage.getItem('cartData');
        if (dataString) {
            this.cartData = JSON.parse(dataString)
        }
    }

    saveData(data: itemData[]) {
        const jsonData = JSON.stringify(data)
        this.storage.setItem('cartData', jsonData)
    }

    createOncloseListener() {
        const self = this
        window.addEventListener('beforeunload', () => {
            const data = self.onWindowCloseCallback()
            self.saveData(data)
        })
    }
}    