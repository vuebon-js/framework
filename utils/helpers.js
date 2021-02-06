export function app() {
    return require('../core/App').App.make();
}

export function make (id) {
    return app().resolve(id);
}

export function typeOf(data, type) {
    try {
        const pure_type = Object.prototype.toString.call(data)
            .match(new RegExp('(?<=\\s)[a-zA-Z]+'))[0];

        return pure_type.toLowerCase() === type.toLowerCase();
    } catch (e) {
        console.error(e);
        return false;
    }
}

export function dataGet(key, value, _default = null) {
    let segment;
    const segments = key.split('.');

    while (segment = segments.shift()) {
        if (!(segment in value)) {
            return _default;
        }
        value = value[segment]
    }

    return value;
}

export function config(key, _default = null) {
    if (!key.includes('.')) {
        return _default;
    }

    return app().config(key, _default);
}

export function toUpperCaseFirst(value) {
    return value[0].toUpperCase() + value.slice(1);
}

export function observable(obj) {
    return make('vue').observable(obj);
}