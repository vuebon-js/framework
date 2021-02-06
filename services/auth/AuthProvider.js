import {Auth} from "../../services/auth/Auth"

export default class AuthProvider {
    constructor(App) {
        this.App = App;
    }

    register() {
        this.App.singleton('auth', function () {
            return new Auth(
                ...this.resolveAll('loader', 'vue-router', 'persistent')
            )
        });
    }

    boot(vm) {
        Object.assign(vm.config.globalProperties, {
            $auth: this.App.resolve('auth'),
            $user: this.App.resolve('auth').user
        });
    }
}