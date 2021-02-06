import {make} from "../../../utils/helpers";

export class PageNotFoundMiddleware {
    before(route) {
        const exception = make('exception').flush();

        if (! route.to.matched.length) {
            exception.abort(404, 'Not Found');
        }
    }
}