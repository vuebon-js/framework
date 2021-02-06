import {Exception}    from "../../core/Exception";
import {BaseProvider} from "../BaseProvider";

export default class ExceptionProvider extends BaseProvider {
    register() {
        this.App.singleton('exception', function () {
            return new Exception(this.resolve('vue'));
        })
    }

    boot(Vue) {
        Vue.prototype.$exception = this.App.resolve('exception');
        const compNames = this.App.resolve('exception').passThrough;
        compNames.forEach(code => {
            Vue.component(`Error${code}`, () => import(`@view/pages/errors/${code}`));
        })
    }
}