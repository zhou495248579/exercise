import { Watch } from "./watch";

export const CompileUtils = {
  getValue(expr, vm) {
    return expr.split(/\./).reduce((data, attr) => {
      return data[attr];
    }, vm.$data);
  },
  setValue(expr, vm, value) {
    expr.split(".").reduce((data, attr, currentIndex, array) => {
      if (array.length - 1 === currentIndex) {
        data[attr] = value;
      }
      return data[attr];
    }, vm.$data);
  },
  html(node, expr, vm) {
    const value = this.getValue(expr, vm);
    this.update.html(node, value);
    new Watch(expr, vm, (value) => {
      this.update.html(node, value);
    });
  },
  modal(node, expr, vm) {
    node.addEventListener(
      "input",
      (e) => {
        this.setValue(expr, vm, e.target.value);
      },
      false
    );
    new Watch(expr, vm, (value) => {
      this.update.mode(node, value);
    });
    this.update.mode(node, this.getValue(expr, vm));
  },
  text(node, expr, vm) {},
  update: {
    html(node, value) {
      node.innerHTML = value;
    },
    mode(node, value) {
      node.value = value;
    },
  },
};
