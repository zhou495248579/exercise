import {Compile} from "./compile";

export default class Vue {
    constructor(el, data, option) {
        this.$el = el;
        this.$data = data;
        this.$option = option;
        if (this.$el) {
            new Compile(this.$el, this);
        }
    }


}
