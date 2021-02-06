import {Auth}         from "../../services/auth/Auth"
import {BaseProvider} from "../../core/BaseProvider";

export default class AuthProvider extends BaseProvider {
    register() {
        this.App.singleton('auth', function () {
            return new Auth(
                ...this.resolveAll('loader', 'vue-router', 'persistent')
            )
        });
    }

    boot(Vue) {
        Object.assign(Vue.prototype, { 
            $auth: this.App.resolve('auth'),
            $user: this.App.resolve('auth').user
        });
    }
}