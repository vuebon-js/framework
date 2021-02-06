import readonly   from "../../utils/decorators";
import {User}     from "./User"
import {config}   from "../../utils/helpers";
import {reactive} from "vue"

export class Auth {
    #tokens = null;
    #loader;
    #router;
    #storage;

    constructor($loader, $router, $storage) {
        this.#loader = $loader;
        this.#router = $router;
        this.#storage = $storage;
        this.state = reactive({
            user: new User(),
        })
        this.#addStorageListener();
    }

    @readonly async resolve() {
        try {
            const tokens = this.#storage.get(config('auth.storage_key'));

            if (!tokens) {
                console.debug("JWT is not exists in local storage.");
            } else if (!this.user.exists()) {
                await this.#makeAuthentication(tokens);
            }

        } catch (err) {
            this.#storage.remove(config('auth.storage_key'));
            this.#router.replace({name: config('auth.routes.login')});
            console.error(err);
            await this.#loader.hide();
        }
    }

    @readonly tokens() {
        return {...this.#tokens};
    }

    @readonly access_token() {
        return this.#tokens.access_token || null;
    }

    @readonly logout() {
        this.#storage.remove(config('auth.storage_key'));
        this.#tokens = null;
        this.user.destroy();
        this.#router.replace({name: config('auth.routes.login')});
    }

    @readonly async login(credentials) {
        try {
            this.#loader.show();

            const tokens = await this.#fetchJWT(credentials);

            this.#storage.set(config('auth.storage_key'), tokens);
            await this.#makeAuthentication(tokens);

            this.#router.replace({name: config('auth.routes.home')});
        } catch (err) {
            this.#storage.remove(config('auth.storage_key'));
            throw err;
        } finally {
            await this.#loader.hide();
        }
    }

    @readonly check() {
        return this.user.exists() && this.#tokens !== null;
    }

    @readonly guest() {
        return !this.check()
    }

    @readonly async resolveUser(tokens = null) {
        const response = await this.#fetchUser(tokens);

        if (!response.ok) {
            throw new Error('Resolve User Error. Status: '+response.status)
        }

        return response.json();
    }

    get user() {
        return this.state.user;
    }

    set user(v) {
        this.state.user = v;
    }

    async #makeAuthentication(tokens) {
        this.user.create(await this.resolveUser(tokens));
        this.#tokens = tokens;
    }

    #getJWTRequestBody(credentials) {
        return JSON.stringify({
            ...config('auth.jwt'),
            ...credentials
        });
    }

    #getJWTRequestURL() {
        return config('api.base_url') + config('api.login_path');
    }

    #fetchJWT(credential) {
        return fetch(this.#getJWTRequestURL(), {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: this.#getJWTRequestBody(credential)
        }).then(response => response.json())
    }

    #getUserRequestURL() {
        return config('api.base_url') + config('api.auth_user_path');
    }

    #fetchUser(tokens) {
        return fetch(this.#getUserRequestURL(), {
            headers: {
                Accept: 'application/json',
                Authorization: `${tokens.token_type} ${tokens.access_token}`
            }
        });
    }

    #addStorageListener() {
        window.addEventListener('storage', (e) => {
            if (config('auth.storage_key') === e.key) {
                location.reload();
            }
        });
        return this;
    }
}