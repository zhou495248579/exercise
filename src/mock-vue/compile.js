import { CompileUtils } from "./utils";

export class Compile {
  constructor(el, vm) {
    this.vm = vm;
    if (el && el.nodeType === 1) {
      this.$el = el;
    } else {
      this.$el = document.querySelector(el);
    }
    const fragment = document.createDocumentFragment();
    while (el.firstChild) {
      fragment.appendChild(el.firstChild);
    }
    this.compile(fragment);
    this.$el.appendChild(fragment);
  }
  compile(fragment) {
    fragment.childNodes.forEach((childnode) => {
      if (childnode.nodeType === 1) {
        this.compileElement(childnode);
      } else {
        this.compileText(childnode);
      }
      if (childnode.childNodes.length > 0) {
        this.compile(childnode);
      }
    });
  }
  compileElement(element) {
    const attrs = Array.from(element.attributes);
    attrs.forEach((attr) => {
      const { name, value } = attr;
      if(this.isDirective(name)) {
        const [, directive] = name.split("-");
        const [dirName, eventName] = directive.split(":");
        CompileUtils[dirName](element, value, this.vm, eventName);
      }

    });
  }
  isDirective(name) {
    if (typeof name !== "string") {
      return false;
    }
    return name.startsWith("v-");
  }
  compileText(text) {}
}
