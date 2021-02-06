import {make} from "../../utils/helpers";

export class Persistent
{
    constructor(items) {
        this.items = make('vue').observable({...items});
    }

    get(key) {
        try {
            return JSON.parse(this.items[key])
        }
        catch {
            return this.items[key]
        }
    }

    _convertStr(value) {
        if (typeof value === "object") {
            return JSON.stringify(value);
        }
        return value;
    }

    set(key, value) {
        value = this._convertStr(value);
        make('vue').set(this.items, key, value);
        localStorage.setItem(key, value);
        return this;
    }

    all() {
        return this.items;
    }

    remove(key) {
        make('vue').delete(this.items, key);
        localStorage.removeItem(key);
        return this;
    }

    clear() {
        this.items = null;
        localStorage.clear();
        return this;
    }
}