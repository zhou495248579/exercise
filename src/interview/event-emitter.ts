export class EventEmitter {
  private events: {
    [key: string]: Function[];
  } = {};
  constructor() {}

  on(eventName: string, callBack: Function) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(callBack);
  }
  emit(eventName: string) {
    if (Array.isArray(this.events[eventName])) {
      this.events[eventName].forEach((item) => {
        item();
      });
    }
  }
  public once(eventName: string, callBack: Function) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    const temp = () => {
      callBack();
      this.off(eventName, temp);
    };
    this.events[eventName].push(temp);
  }
  off(eventName: string, callback: Function) {
    if (this.events[eventName]) {
      this.events[eventName] = this.events[eventName].filter((item) => {
        return item !== callback;
      });
    }
  }
}
