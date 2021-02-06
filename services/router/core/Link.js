import {addIfNotExistIn, fixSlash} from "./utils";
import {Routable} from './Routable';

export class Link extends Routable
{
    constructor(path, componentName, componentResolver, options)
    {
        super(options);
        this.componentResolver = componentResolver;
        this.setInitOptions(path, componentName);
    }

    setInitOptions(path, componentName)
    {
        this.options.meta.componentDir = fixSlash(
            this.options.meta.namespace.concat(this.options.meta.namespace.length ? '/' : '', componentName)
        );
        this.options.meta.componentName = componentName;
        this.options.path = fixSlash(this.options.meta.prefix.concat('/', path));
        this.options.component = this.componentResolver(this.options.meta.componentDir);
        /*this.options.component = () => import(
            /!* webpackChunkName: "[request]" *!/
            `@view/pages${this.options.meta.componentDir}.vue`
        );*/
    }

    namespace(path)
    {
        this.options.meta.namespace += this.options.meta.namespace.length ? '/'.concat(path) : path;
        this.options.meta.componentDir = fixSlash(this.options.meta.namespace.concat('/', this.options.meta.componentName));
        this.options.component = this.componentResolver(this.options.meta.componentDir);
        this.options.component = () => import(
            /* webpackChunkName: "[request]" */
            `@view/pages${this.options.meta.componentDir}.vue`
        );

        return this;
    }

    name(value = null)
    {
        this.options.name = value;
        return this;
    }

    middleware(value)
    {
        let currentMiddleware = this.options.meta.middleware || [];

        currentMiddleware = Array.isArray(value)
            ? addIfNotExistIn(value, currentMiddleware)
            : addIfNotExistIn(Array.from(arguments), currentMiddleware);

        this.options.meta.middleware = currentMiddleware;

        return this;
    }

    /*resolveComponent(path)
    {
        return this.resolveComponent();
        /!*return () => import(`@view/pages${path}.vue` /!* webpackChunkName: '[request]' *!/);*!/
    }*/
}