import {toUpperCaseFirst, make} from "../../../utils/helpers";

export class AuthMacro
{
    constructor() {
        this.optionNames = ['login', 'register'];
    }

    getComponentOptionsFor(key) {
        return {
            path: this.options?.[key]?.path ?? '/' + key,
            component: this.options?.[key]?.filename ?? toUpperCaseFirst(key),
            name: this.options?.[key]?.name ?? key,
            middleware: this.options?.[key]?.middleware ?? 'guest',
            namespace: this.options?.[key]?.namespace ?? 'authentication'
        }
    }

    createRoutes(Route) {
        this.optionNames.forEach(name => {
            const options = this.getComponentOptionsFor(name);
            Route.link(options.path, options.component)
                .name(options.name)
                .middleware(options.middleware)
                .namespace(options.namespace);
        })
    }

    load() {
        make('router').macro('auth', (Route, options) => {
            this.options = options;
            this.createRoutes(Route);
        })
    }
}