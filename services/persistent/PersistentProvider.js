import {Persistent}   from "./Persistent"

export default class PersistentProvider {
    constructor(App) {
        this.App = App;
    }

    register() {
        this.App.singleton('persistent', () => {
            return new Proxy(new Persistent(localStorage), this.#getProxyHandler())
        })
    }

    boot(vm) {
        vm.config.globalProperties.$persistent  = this.App.resolve('persistent');
        vm.config.globalProperties.$persistents = this.App.resolve('persistent').items;

    }

    #getProxyHandler() {
        return {
            get(target, p) {
                if (typeof target[p] !== "undefined") {
                    return Reflect.get(...arguments);
                }
                return target.get(p)
            },
            set(target, p, value) {
                target.set(p, value);
                return true;
            }
        }
    }
}