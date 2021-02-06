export class Container {
    constructor() {
        this.services = new Map();
    }

    set(id, definition, singleton, defer = false) {
        this.services.set(id, {
            definition,
            singleton,
            instance: !defer ? definition() : null
        });
    }

    bind(id, definition) {
        this.set(id, definition.bind(this), false)
        return this;
    }

    singleton(id, definition, defer = false) {
        this.set(id, definition.bind(this), true, defer)
        return this;
    }

    resolve(id, force = false) {
        const service = this.services.get(id);

        if (!service) {
            throw `Container Error: "${id}" service is not defined`
        }

        if (service.singleton && !force) {
            return service.instance ??= service.definition();
        }

        return service.definition()
    }

    resolveAll(...ids) {
        return ids.map(id => this.resolve(id))
    }

    instance(id, instance, singleton = true) {
        this.set(id, function () {
            return instance;
        }, singleton);
        return this;
    }
}