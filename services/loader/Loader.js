import {observable} from "../../utils/helpers";

export default class Loader {
    constructor(props = {}) {
        this.state = observable({
            visible: false,
            enterTimeout: props.enterTimeout || 0,
            leaveTimeout: props.leaveTimeout || 0
        });
    }

    get visible() {
        return this.state.visible;
    }

    set visible(_visible) {
        this.state.visible = _visible;
    }

    get enterTimeout() {
        return this.state.enterTimeout;
    }

    set enterTimeout(delay) {
        this.state.enterTimeout = delay;
    }

    get leaveTimeout() {
        return this.state.leaveTimeout;
    }

    set leaveTimeout(delay) {
        this.state.leaveTimeout = delay;
    }

    #getDelay(timeout, defaultTimeout) {
        return timeout !== null ? timeout : this[defaultTimeout]
    }

    show(timeout = null) {
        return new Promise(resolve => {
            setTimeout(() => {
                this.visible = true;
                resolve(this.visible);
            }, this.#getDelay(timeout, 'enterTimeout'))
        })
    }

    hide(timeout = null) {
        return new Promise(resolve => {
            setTimeout(() => {
                this.visible = false;
                resolve(this.visible);
            }, this.#getDelay(timeout, 'leaveTimeout'))
        })
    }

    async toggle() {
        if (this.visible) {
            await this.hide()
        }
        else {
            await this.show();
        }
    }
}