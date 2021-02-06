import {Gate} from "../../services/gate/Gate";

export default class GateProvider {
    constructor(App) {
        this.App = App;
    }
    register() {
        this.App.singleton('gate', function () {
            return new Gate(this.resolve('auth'))
        })
    }
    async boot(Vue) {
        Vue.prototype.$gate = this.App.resolve('gate');
        this.App.resolve('gate')._setAuthUserAuthorizeMethods();
    }
}
