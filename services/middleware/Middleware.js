import {BeforeHook} from "./BeforeHook";
import {RoutesCollection} from "./RoutesCollection";
import {AfterHook} from "./AfterHook";
import {GlobalsCollection} from "./GlobalsCollection";
import {make} from "../../utils/helpers";

export class Middleware
{
    #loader;
    #router;
    #route;

    constructor(registrations) {
        this.#loader = make('loader');
        this.#router = make('vue-router');
        this.init(registrations);
    }

    init({globals, routes}) {
        this.routeCollection  = new RoutesCollection(routes);
        this.globalCollection = new GlobalsCollection(globals)
        this.#router.beforeEach(this.beforeEachBinder.bind(this));
        this.#router.afterEach(this.afterEachBinder.bind(this));
        this.middleware = [];
    }

    /**
     * Global ve Rota ara katmanları birleştiriliyor.
     */
    prepareMiddleware() {
        this.middleware = this.globalCollection.get().concat(
            this.routeCollection.get(this.#route)
        );
    }


    /**
     *  Multiple to singular middleware
     *  (Metada belirtilen çoklu middleware'lar vue-router'a uyumlu şekle yani tekil hale getiriliyor)
     */
    async beforeEachBinder(to, from, next) {
        this.#route = {to, from};

        this.prepareMiddleware();

        const response = await new BeforeHook(
            this.middleware,
            this.#route
        ).get()

        if (from.path === response || from.name === response?.name) {
            await this.#loader.hide(150);
        }

        next(response)
    }

    async afterEachBinder() {
        if (this.#route.to.name !== this.#route.from.name)
            scrollTo(0, 0);

        await new AfterHook(
            this.middleware,
            this.#route
        ).call()
    }
}