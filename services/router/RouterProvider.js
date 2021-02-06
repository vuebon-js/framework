import {Router}       from "./Router";
import {BaseProvider} from "../../core/BaseProvider";
import {AuthMacro}    from "./auth/macro";

export default class RouterProvider extends BaseProvider {
    register() {
        this.App.singleton('router', function () {
            return new Router();
        })
    }

    boot() {
        this.#loadDefaultRoutes();
        new AuthMacro().make()
    }

    #loadDefaultRoutes() {
        this.App.resolve('router').link('maintenance', 'Maintenance').namespace('modes');
    }
}