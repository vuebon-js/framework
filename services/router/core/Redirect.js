import {Routable} from './Routable'
import {fixSlash} from "./utils";

export class Redirect extends Routable
{
    constructor(path, to, options)
    {
        super(options);
        this.options.path = fixSlash(this.options.meta.prefix.concat('/', path));
        this.options.redirect = to;
    }
}