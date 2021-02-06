import {Router}       from "./Router";
import {AuthMacro}    from "./auth/macro";

export default class RouterProvider {
    constructor(App) {
        this.App = App;
    }

    register() {
        this.App.singleton('router', function ()  {
            return new Router();
        })
    }

    boot() {
        new AuthMacro().load()
        this.#loadDefaultRoutes();
    }

    #loadDefaultRoutes() {
        this.App.resolve('router').link('maintenance', 'Maintenance').namespace('modes');
    }
}