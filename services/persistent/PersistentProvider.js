import {Persistent}   from "./Persistent"
import {BaseProvider} from "../../core/BaseProvider";

export default class PersistentProvider extends BaseProvider {
    register() {
        this.App.singleton('persistent', () => {
            return new Proxy(new Persistent(localStorage), this.#getProxyHandler())
        })
    }

    boot(Vue) {
        Vue.prototype.$persistent = this.App.resolve('persistent');
        Vue.mixin({
            data: () => ({
                vuebon_persistent: this.App.resolve('persistent').items
            })
        })
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