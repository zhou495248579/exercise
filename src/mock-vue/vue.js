import {Compile} from "./compile";
import Observer from "./observer";

export default class Vue {
    constructor(el, data, option) {
        this.$el = el;
        this.$data = data;
        this.$option = option; // 绑定方法放在这里
        if (this.$el) {
            new Observer(this.$data)
            new Compile(this.$el, this);
        }
    }
}
