import {GateType} from "./GateType";
import {BaseProvider} from "../../core/BaseProviderType";
import {VueConstructor} from "vue";

export default class GateProvider extends BaseProvider {
    register() {
        this.App.singleton('gate', function () {
            return new GateType(this.resolve('auth'))
        })
    }

    async boot(Vue: VueConstructor) {
        Vue.prototype.$gate = this.App.resolve('gate');
        this.App.resolve('gate')._setUserAuthorizeMethods();
    }
}