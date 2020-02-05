import {Compile} from "./compile";
import Observer from "./observer";

export default class Vue {
    constructor(el, data, option) {
        this.$el = el;
        this.$data = data;
        this.$option = option;
        if (this.$el) {
            new Observer(this.$data)
            new Compile(this.$el, this);
        }
    }


}
