export class Routable {
    constructor(options) {
        Object.assign(this.options = {
            name: null,
            component: null
        }, options);
    }
}