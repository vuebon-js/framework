import {reactive} from 'vue';

export class Persistent
{
    constructor(items) {
        this.items = reactive({...items});
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
        this.items[key] = value;
        localStorage.setItem(key, value);
        return this;
    }

    all() {
        return this.items;
    }

    remove(key) {
        delete this.items[key];
        localStorage.removeItem(key);
        return this;
    }

    clear() {
        this.items = reactive({});
        localStorage.clear();
        return this;
    }
}