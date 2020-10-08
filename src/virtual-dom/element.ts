export class Element {
  constructor(public tagName: string, public children: (Element | string)[]) {}

  public render() {
    const ele = document.createElement(this.tagName);
    if (Array.isArray(this.children)) {
      this.children.forEach((item) => {
        if (item instanceof Element) {
          ele.appendChild(item.render());
        } else {
          ele.appendChild(document.createTextNode(item));
        }
      });
    }
    return ele;
  }
}
