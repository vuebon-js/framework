import readonly from "../../utils/decorators"

export class User
{
    @readonly create(props) {
        for (let [key, val] of Object.entries(props)) this[key] = val;
    }

    @readonly destroy() {
        Object.keys(this).forEach(key => delete this[key])
    }

    @readonly exists() {
        return Object.keys(this).length > 0
    }
}