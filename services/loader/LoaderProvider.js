import Loader         from "./Loader";
import Component      from "./Component";

export default class LoaderProvider {
    constructor(App) {
        this.App = App;
    }

    register() {
        this.App.singleton('loader', function () {
            return new Loader();
        })
    }

    boot(vm) {
        vm.component('VbLoader', Component);
        vm.config.globalProperties.$loader = this.App.resolve('loader')
    }
}