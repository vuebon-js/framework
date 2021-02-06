import Loader         from "./Loader";
import Component      from "./Component";
import {BaseProvider} from "../../core/BaseProvider";

export default class LoaderProvider extends BaseProvider {
    register() {
        this.App.singleton('loader', function () {
            return new Loader();
        })
    }

    boot(Vue) {
        Vue.component('VbLoader', Component);
        Vue.prototype.$loader = this.App.resolve('loader')
    }
}