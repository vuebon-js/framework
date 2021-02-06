import readonly from "../../utils/decorators"
import {make}   from "../../utils/helpers";

export class User
{
    @readonly create(props) {
        for (let [k, v] of Object.entries(props)) make('vue').set(this, k, v);
    }

    @readonly destroy() {
        Object.keys(this).forEach(key => make('vue').delete(this, key))
    }

    @readonly exists() {
        return Object.keys(this).length > 0
    }
}