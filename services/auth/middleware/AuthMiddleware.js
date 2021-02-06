import {config, make} from "../../../utils/helpers";

export class AuthMiddleware {
    async before(route) {
        await make('auth').resolve();

        return make('auth').check() || {
            name: config('auth.routes.register')
        }
    }
}