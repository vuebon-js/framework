import {Exception}            from "../../core/Exception";
import {defineAsyncComponent} from "vue";

export default class ExceptionProvider {
    constructor(App) {
        this.App = App;
    }

    register() {
        this.App.singleton('exception', function () {
            return new Exception(this.resolve('vue'));
        })
    }

    boot(vm) {
        vm.config.globalProperties.$exception = this.App.resolve('exception');
        const compNames = this.App.resolve('exception').passThrough;
        compNames.forEach(code => {
            vm.component(`Error${code}`, defineAsyncComponent(() => import(`@view/pages/errors/${code}`)));
        })
    }
}