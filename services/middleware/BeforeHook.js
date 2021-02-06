export class BeforeHook {
    constructor(middleware, route) {
        this.route = route;
        this.middleware = middleware;
    }

    async #resolveBefore(middleware) {
        this.response = await middleware?.before(this.route);
    }

    isAbort() {
        return this.response !== true && typeof this.response !== "undefined";
    }

    async get() {
        for (let i = 0; i < this.middleware.length; i++) {
            await this.#resolveBefore(this.middleware[i]);
            if (this.isAbort()) {
                return this.response;
            }
        }
    }

    async log() {
        console.log(await this.get())
    }
}