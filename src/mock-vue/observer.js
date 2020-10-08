import { Dep } from "./watch";

export default class Observer {
  constructor(data) {
    this.observe(data);
  }
  observe(data) {
    if (typeof data === "object") {
      const keys = Object.keys(data);
      for (const key of keys) {
        this.defineReactive(data, key, data[key]);
      }
    }
  }

  defineReactive(data, key, value) {
    this.observe(value);
    const dep = new Dep();
    Object.defineProperty(data, key, {
      configurable: true,
      enumerable: true,
      get: () => {
        Dep.target && dep.add(Dep.target);
        return value;
      },
      set: (newValue) => {
        console.log(newValue);
        this.observe(newValue);
        if (value !== newValue) {
          value = newValue;
          dep.notify();
        }
      },
    });
  }
}
