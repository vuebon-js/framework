import {config, make} from "../../../utils/helpers";

export class GuestMiddleware {
    async before(route) {
        await make('auth').resolve();

        return make('auth').guest() || {
            name: config('auth.routes.home')
        }
    }
}