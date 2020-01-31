const setAttribute = (node, key, value) => {
    switch (key) {
        case 'style':
            node.style.cssText = value
            break
        case 'value':
            let tagName = node.tagName || ''
            tagName = tagName.toLowerCase()
            if (
                tagName === 'input' || tagName === 'textarea'
            ) {
                node.value = value
            } else {
                // 如果节点不是 input 或者 textarea, 则使用 setAttribute 去设置属性
                node.setAttribute(key, value)
            }
            break
        default:
            node.setAttribute(key, value)
            break
    }
}
const renderDom = (element, target) => {
    target.appendChild(element)
}


class Element {
    constructor(tagName, attributes = {}, children = []) {
        this.tagName = tagName;
        this.attributes = attributes;
        this.children = children;
    }

    render() {
        let ele = document.createElement(this.tagName);
        for (let key in this.attributes) {
            setAttribute(ele, key, this.attributes[key]);
        }
        this.children.forEach((childElement) => {
            if (childElement instanceof Element) {
                ele.appendChild(childElement.render());
            } else if (typeof childElement === 'string') {
                ele.appendChild(document.createTextNode(childElement));
            }
        })
        return ele;
    }

}
