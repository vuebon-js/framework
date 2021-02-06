import {observable} from '../../utils/helpers';

type TCallback = (user: object, args?) => boolean

interface IPoliciesType {
    [propName: string]: TCallback
}

interface IAuthUser extends Object {
    __proto__: object
}

export class GateType {
    protected policies: IPoliciesType;

    constructor(private auth: {user: IAuthUser}, policies: IPoliciesType = {}) {
        this.policies = observable(policies);
    }

    define(policy: string, callback: TCallback): void {
        this.policies[policy] = callback;
    }

    allow(policy: string, ...args: any[]): boolean {
        return this.policies[policy](this.auth.user, ...args)
    }

    deny(policy, ...args: any[]): boolean {
        return !this.policies[policy](this.auth.user, ...args)
    }

    _setUserAuthorizeMethods(): void {
        Object.defineProperties(this.auth.user.__proto__, {
            can: {
                value: this.allow.bind(this),
            },
            cant: {
                value: this.deny.bind(this)
            }
        })
    }
}