export class GlobalsCollection
{
    constructor(middlewareList) {
        this.middlewareList = middlewareList;
    }

    get() {
        return this.middlewareList.map(middleware => {
            return new middleware()
        })
    }
}