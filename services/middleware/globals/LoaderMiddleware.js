import {make} from "../../../utils/helpers";

export class LoaderMiddleware {
    async before(route) {
        await make('loader').show();
    }
    after(route, next) {
        make('loader').hide(150);
    }
}