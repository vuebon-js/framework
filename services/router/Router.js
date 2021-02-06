import {fixSlash} from './core/utils';
import {Link}     from "./core/Link";
import {Redirect} from "./core/Redirect";
import {config}   from "../../utils/helpers";

export class Router {
    constructor() {
        this.routes = [];
        this.groups = [];
        this.componentResolver = () => null;
    }

    macro(name, fn) {
        this[name] = (...arg) => fn(this, ...arg);
    }

    link(path, fileName) {
        const link = new Link(path, fileName, this.componentResolver, {
            meta: {
                middleware: this.#mergeGroupMiddleware(),
                namespace: fixSlash(this.#mergeGroupNamespace(), false),
                prefix: fixSlash(this.#mergeGroupPrefix()),
            }
        });
        this.routes.push(link.options);
        return link;
    }

    redirect(path, to) {
        const redirect = this.#createRedirectInstance(path, to);
        this.routes.push(redirect.options);
        return redirect;
    }

    group(options, routes) {
        this.groups.push(options);
        routes();
        this.groups.pop();
    }

    get() {
        return this.routes;
    }

    setComponentResolver(fn) {
        this.componentResolver = fn.bind(this);
        return this;
    }

    #createRedirectInstance(path, to) {
        return new Redirect(path, to, {
            meta: {
                middleware: [],
                namespace: '',
                prefix: fixSlash(this.#mergeGroupPrefix()),
            }
        })
    }

    #mergeGroupPrefix() {
        return this.groups.reduce((carry, curr) => {
            return curr.prefix !== undefined
                ? carry.concat('/', curr.prefix)
                : '';
        }, '/');
    }

    #mergeGroupNamespace() {
        return this.groups.reduce((carry, curr) => {
            return curr.namespace !== undefined
                ? carry.concat(curr.namespace, '/')
                : '';
        }, '');
    }

    #mergeGroupMiddleware() {
        return this.groups.reduce((carry, current) => {
            return current.middleware !== undefined
                ? carry.concat(current.middleware, carry)
                : carry.concat([])
        }, []);
    }
}