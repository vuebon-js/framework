import {reactive} from "vue";

export class Gate {
    #auth; 

    constructor(auth, policies = {}) {
        this.policies = reactive(policies);
        this.#auth = auth;
    }
    define(policy, callback) {
        this.policies[policy] = callback;
    }
    allow(policy, ...args) {
        return this.policies[policy](this.#auth.user, ...args)
    }
    deny(policy, ...args) {
        return ! this.policies[policy](this.#auth.user, ...args)
    }
    _setAuthUserAuthorizeMethods() {
        Object.defineProperties(this.#auth.user.__proto__, {
            can: {
                value: this.allow.bind(this),
            },
            cant: {
                value: this.deny.bind(this)
            }
        })
    }
}