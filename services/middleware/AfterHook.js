export class AfterHook {
    constructor(middleware, route) {
        this.route = route;
        this.middleware = middleware;
    }

    async call() {
        for (let i = 0; i < this.middleware.length; i++) {
            if (typeof this.middleware[i] === "object" && typeof this.middleware[i].after === "function") {
                await this.middleware[i].after(this.route)
            }
        }
    }
}