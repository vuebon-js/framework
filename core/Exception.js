import {typeOf, observable} from '../utils/helpers'

export class Exception {
    #state;

    constructor(Vue, passThrough = [401, 403, 404]) {
        this.#state = observable({
            code: null,
            message: ''
        });
        this.passThrough = passThrough;
    }

    abort(code, message) {
        if (this.passThrough.includes(code)) {
            this.code = code;
            this.message = message;
        }
        return this;
    }

    handle(code, throwable) {
        if (throwable instanceof PromiseRejectionEvent) {
            this.trace = this.extractStack(throwable.reason.stack);
            this.message = throwable.reason.message;
        }
        else if (throwable instanceof Error) {
            this.trace = this.extractStack(throwable?.stack);
            this.message = throwable.message;
        }
        else if (typeOf(throwable, "string")) {
            this.message = throwable;
        }
        else {
            console.log('Exception: Not Throwable Value')
        }
    }

    extractStack(v = '') {
        return v.split(/\n/).slice(1).map(part => part.trimLeft());
    }

    flush() {
        this.code = null;
        this.message = '';

        return this;
    }

    get code() {
        return this.#state.code
    }
    set code(v) {
        this.#state.code = v;
    }
    get message() {
        return this.#state.message;
    }
    set message(v) {
        this.#state.message = v;
    }
}