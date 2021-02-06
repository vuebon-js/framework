export class RoutesCollection
{
    constructor(middlewareList) {
        this.middlewareList = middlewareList;
    }

    getAssignedNames(route) {
        return route?.to?.meta?.middleware ?? []
    }

    getRegisteredNames() {
        return Object.keys(this.middlewareList);
    }

    isRegistered(search) {
        return this.getRegisteredNames().includes(search);
    }

    get(route) {
        return this.getAssignedNames(route).reduce((carry, name) => {
            if (this.isRegistered(name)) {
                return carry.concat(new this.middlewareList[name])
            }
            console.warn(`"${name}" middleware not found. Did you register?`)
        }, [])
    }
}