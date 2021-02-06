import {config} from "../../../utils/helpers";

export class MaintenanceMiddleware {
    before(route) {
        const maintenance = JSON.parse(config('app.maintenance'));
        if (maintenance && route.to.path !== '/maintenance') {
            return '/maintenance';
        }
        if (! maintenance && route.to.path === '/maintenance') {
            return '/';
        }
    }
}