import {Container}       from "./Container";
import {Middleware}      from "../services/middleware/Middleware";
import ExceptionProvider from "./providers/ExceptionProvider";
import {Config}          from "./Config";

export class App extends Container {
    static #instance;
    #Config;

    static async bootstrap({middleware, ...options}) {
        App.#instance ??= new App(options);

        await App.#instance.loadProviders();

        new Middleware(middleware);

        return App.#instance;
    }

    static make() {
        return App.#instance;
    }

    constructor({config, providers, vm}) {
        super();

        this.createBaseInstances(vm)
            .loadConfig(config)
            .prepareProviders([ExceptionProvider].concat(providers));

        window.vuebon = this;
    }

    createBaseInstances(vm) {
        this.instance('app', this);
        this.instance('vue', vm);

        return this;
    }

    loadConfig(props) {
        this.#Config = new Config(props);
        return this;
    }

    prepareProviders(providers) {
        this.providers = this.getProvidersInstance(providers);

        return this;
    }

    async loadProviders() {
        await this.registerProviders(this.providers);
        await this.bootProviders(this.providers);
    }

    config(key = null, _default = null) {
        if (!key) {
            return this.#Config;
        }

        return this.#Config.get(key, _default);
    }

    isLocal() {
        return this.config('app.env') === 'development';
    }

    isProduction() {
        return this.config('app.env') === 'production';
    }

    getProvidersInstance(providers) {
        return providers.map(providerClass => new providerClass(this))
    }

    /**
     * Provider'ın "register" fonksiyonu çağrılıyor ve servis yükleniyor.
     *
     * @param provider
     * @return {Promise<void>}
     */
    async loadService(provider) {
        if (typeof provider.register === "function") {
            await provider.register();
        } else {
            console.warn(provider.name + ' failed to registering. ' +
                'The "register" function is not defined.'
            );
        }
    }

    /**
     * Her bir Provider'ın "register" fonksiyonunu tetikleyecek döngü.
     *
     * @param providers
     * @return {Promise<void>}
     */
    async registerProviders(providers) {
        for (let i = 0; i < providers.length; i++) {
            await this.loadService(providers[i]);
        }
    }

    /**
     * Provider'ların Boot Fonksiyonu Çağrılıyor
     *
     * @param providers
     * @return {Promise<void>}
     */
    async bootProviders(providers) {
        for (let i = 0; i < providers.length; i++) {
            if (typeof providers[i].boot === "function") {
                await providers[i].boot(this.resolve('vue'));
            }
        }
    }
}

/*listenErrors() {
       Vue.config.errorHandler = (err, vm, info) => {
           this.resolve('exception').handle(500, err)
       }
       Vue.config.warnHandler = (err, vm, info) => {
           this.resolve('exception').handle(500, err)
       }
       window.addEventListener('error',  (e) => {
           this.resolve('exception').abort(500, e.stack)
       })
       window.addEventListener('unhandledrejection', (e) => {
           this.resolve('exception').abort(500, e.reason.message, e.reason.stack)
       })
   }*/