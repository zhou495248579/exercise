import Observer from "./observer";
import { Compile } from "./compile";

export  class Vue {
  constructor(el, data, option) {
    this.$el = el;
    this.$data = data;
    new Observer(data);
    new Compile(el, this);
  }
}
