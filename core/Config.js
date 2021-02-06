import {dataGet} from "../utils/helpers";

export class Config {
    constructor(props) {
        this.props = props;
    }

    get(key) {
        return dataGet(key, this.props);
    }

    has(key) {
        return dataGet(key, this.props) !== null;
    }
}